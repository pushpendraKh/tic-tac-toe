import { RouterModule, Routes } from '@angular/router';

import { GamePageComponent } from './components/game-page/game-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'game/:id',
    component: GamePageComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
