import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiGITService } from 'src/app/services/api-git.service';
import { Repository } from 'src/app/Repository';
import { SearchService } from 'src/app/services/search.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private apiGIT: ApiGITService, private searchService: SearchService) {

  }
  searchTerm: string = ''; // Variável para rastrear o termo de pesquisa


  getRepository(): void {
    if (this.searchTerm.trim() !== ''){
        this.apiGIT.getAll(this.searchTerm).subscribe((response: {repositories: Repository[], total_count: number}) => {
        console.log(response.repositories);
        console.log(response.total_count);
        this.searchService.setSearchTerm(this.searchTerm);
      }); 
    }
    }
}
