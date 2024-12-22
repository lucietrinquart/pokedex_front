import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-login',
  template: `
    <div class="flex min-h-screen items-center justify-center">
      <button
        class="btn btn-primary"
        (click)="login()"
      >
        Se connecter avec GitHub
      </button>
    </div>
  `
})



export class LoginComponent {
  constructor(private apiService: ApiService) {}

  async login() {
    await this.apiService.redirectToGithub();
  }
}