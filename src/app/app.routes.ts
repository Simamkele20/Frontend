import { Routes } from '@angular/router';
import { HomeComponent } from './components/Pages/home/home.component';
import { GamePageComponent } from './components/Pages/game-page/game-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'games/:id', component: GamePageComponent },
  { path: '**', redirectTo: '/games' },
];
