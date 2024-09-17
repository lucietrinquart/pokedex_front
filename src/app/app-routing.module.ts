import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pages/pokemon-list/pokemon-list.component";
import {PokemonDetailComponent} from "./pages/pokemon-detail/pokemon-detail.component";

const routes: Routes = [
  {
    path: '',//endroit pour mettre la route
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:pokemon_id',
    component: PokemonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

