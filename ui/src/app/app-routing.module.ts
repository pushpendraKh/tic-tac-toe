import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "game/:id",
    component: GamePageComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
