import { Component } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrl: './parametre.component.scss'
})


export class ParametreComponent {
  get userName(): string {
    return this.apiService.user?.name ?? 'Invité';
  }

  get userdate(): string {
    const createdAt = this.apiService.user?.created_at ?? null;
  
    if (createdAt) {
      const date = new Date(createdAt);
      return date.getFullYear().toString(); 
    }
  
    return 'Invité'; 
  }
  
  constructor(private apiService: ApiService) {}
}
