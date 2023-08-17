import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/Repository';
import { ApiGITService } from 'src/app/services/api-git.service';
import { SearchService } from 'src/app/services/search.service.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  repositories: Repository[] =[];
  total_count: number = 0;

  constructor(private apiGIT: ApiGITService, private searchService: SearchService) {}

  ngOnInit(): void{ 
    this.searchService.getSearchTerm().subscribe(searchTerm => {
      this.loadRepositories(searchTerm);
    });
  }

  loadRepositories(searchTerm: string): void {
    this.apiGIT.getAll(searchTerm).subscribe((response: { repositories: Repository[], total_count: number }) => {
      this.repositories = response.repositories;
      this.total_count = response.total_count; // Atualiza o total_count
    });
  }
}
