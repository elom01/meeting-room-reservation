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
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BuildingRoomsComponent } from './building/building-rooms/building-rooms.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
