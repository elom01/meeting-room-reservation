import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from "./guards/auth.guard";
import { BuildingRoomsComponent } from "./components/building-rooms/building-rooms.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminPageComponent } from "./components/admin/admin-page.component";
import { BuildingPageComponent } from "./components/building/building-page.component";
import { HomePageComponent } from "./components/home/home-page.component";
import { ProfilPageComponent } from "./components/profil/profil-page.component";
import { RoomDetailsComponent } from "./components/room-details/room-details.component";
import { RoomPageComponent } from "./components/room/room-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "building",
    component: BuildingPageComponent,
  },
  {
    path: "building/:id",
    component: BuildingRoomsComponent,
  },
  {
    path: "room",
    component: RoomPageComponent,
  },
  {
    path: "room/:id",
    component: RoomDetailsComponent,
  },
  {
    path: "profil",
    component: ProfilPageComponent,
    canActivate:[
      AuthGuard
    ]
  },
  {
    path: "admin",
    component: AdminPageComponent,
    canActivate:[
      AuthGuard,
      AdminGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
