import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomPageComponent } from './room/room-page.component';
import { HomePageComponent } from './home/home-page.component';
import { BuildingPageComponent } from './building/building-page.component';
import { AdminPageComponent } from './admin/admin-page.component';
import { ProfilPageComponent } from './profil/profil-page.component';
import { RoomDetailsComponent } from './room/room-details/room-details.component';
import { BuildingCardComponent } from './building/building-card/building-card.component';
import { RoomCardComponent } from './room/room-card/room-card.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { BuildingRoomsComponent } from './building/building-rooms/building-rooms.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    RoomPageComponent,
    HomePageComponent,
    BuildingPageComponent,
    AdminPageComponent,
    ProfilPageComponent,
    RoomDetailsComponent,
    BuildingCardComponent,
    RoomCardComponent,
    BuildingRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
