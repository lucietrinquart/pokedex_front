import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pages/pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "./pages/pokemon-detail/pokemon-detail.component";
import {PokemonSearchComponent} from "./pages/pokemon-search/pokemon-search.component";
import {ProfilUserComponent} from "./pages/profil-user/profil-user.component";
import {ParametreComponent} from "./pages/parametre/parametre.component";


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PokemonListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',//endroit pour mettre la route
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:pokemon_id',
    component: PokemonDetailComponent
  },
  {
    path: 'search',
    component: PokemonSearchComponent
  },
  {
    path: 'profil',
    component: ProfilUserComponent
  },
  {
    path: 'parametre',
    component: ParametreComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

