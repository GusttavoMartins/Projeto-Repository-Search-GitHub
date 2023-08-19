import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Repository } from '../Repository';

@Injectable({
  providedIn: 'root'
})

export class ApiGITService {
  private apiURL = 'https://api.github.com/search/repositories?q=python'

  private repositories: Repository[] = [];
  private total_count: number = 0;

  
  constructor(private http: HttpClient) { }

  getAll(searchTerm: string): Observable<{ repositories: Repository[], total_count: number }> {

    const apiUrl = `${this.apiURL}${encodeURIComponent(searchTerm)}`;
    
    return this.http.get<{ items: Repository[], total_count: number }>(apiUrl).pipe(
      map(response => {
         
        this.repositories = response.items;
        this.total_count = response.total_count;
        this.repositories.forEach(repository => {
          repository.topics = repository.topics.slice(0, 5);
        })
        return { repositories: this.repositories, total_count: this.total_count };
      })
    );
  }
}