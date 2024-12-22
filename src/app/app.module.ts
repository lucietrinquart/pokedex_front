import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {provideHttpClient, HttpClientModule} from "@angular/common/http";
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './shared/layouts/pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { TranslocoRootModule } from './transloco-root.module';
import { LangSelectorComponent } from './shared/layouts/lang-selector/lang-selector.component'; // Import du provider
import { FormsModule } from '@angular/forms';
import { PokemonSearchComponent } from './pages/pokemon-search/pokemon-search.component';
import { ProfilUserComponent } from './pages/profil-user/profil-user.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ParametreComponent } from './pages/parametre/parametre.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
    LangSelectorComponent,
    PokemonSearchComponent,
    ProfilUserComponent,
    ThemeToggleComponent,
    ParametreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(), // Ajout du provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }