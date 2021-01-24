import { BuildingRoomsComponent } from './building/building-rooms/building-rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page.component';
import { BuildingPageComponent } from './building/building-page.component';
import { HomePageComponent } from './home/home-page.component';
import { ProfilPageComponent } from './profil/profil-page.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { RoomPageComponent } from './room/room-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'building',
    component: BuildingPageComponent
  },
  {
    path: 'building/:id',
    component: BuildingRoomsComponent
  },
  {
    path: 'room',
    component: RoomPageComponent,
  },
  {
    path: 'room/:id',
    component: RoomDetailsComponent,
  },
  {
    path: 'profil',
    component: ProfilPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
