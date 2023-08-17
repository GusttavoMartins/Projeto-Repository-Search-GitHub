import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Repository } from '../Repository';
import { of } from 'rxjs'; // operador de criação de observável

@Injectable({
  providedIn: 'root'
})
export class ApiGITService {
  private apiURL = 'https://api.github.com/search/repositories?q='

  private repositories: Repository[] = []; // Armazena os dados
  private total_count: number = 0;

  
  constructor(private http: HttpClient) { }

  getAll(searchTerm: string): Observable<{ repositories: Repository[], total_count: number }> {

    const apiUrl = `${this.apiURL}${encodeURIComponent(searchTerm)}`;

    if (this.repositories.length > 0) {

      return of({ repositories: this.repositories, total_count: this.total_count });

    } else {

      return this.http.get<{ items: Repository[], total_count: number }>(apiUrl).pipe(
        map(response => {
          this.repositories = response.items;
          this.total_count = response.total_count;
          // Limitando numero de topics
          this.repositories.forEach(repository => {
            repository.topics = repository.topics.slice(0, 5);
          })
          return { repositories: this.repositories, total_count: this.total_count };
        })
      );

    }
  }
}
