import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RoomPageComponent } from "./room/room-page.component";
import { HomePageComponent } from "./home/home-page.component";
import { BuildingPageComponent } from "./building/building-page.component";
import { AdminPageComponent } from "./admin/admin-page.component";
import { ProfilPageComponent } from "./profil/profil-page.component";
import { RoomDetailsComponent } from "./room/room-details/room-details.component";
import { BuildingCardComponent } from "./building/building-card/building-card.component";
import { RoomCardComponent } from "./room/room-card/room-card.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from "@angular/material";
import { MatListModule } from "@angular/material/list";
import { BuildingRoomsComponent } from "./building/building-rooms/building-rooms.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EventComponent } from "./event/event.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TimetableComponent } from "./timetable/timetable.component";
import { BuildingFormComponent } from "./building/building-form/building-form.component";
import { RoomFormComponent } from "./room/room-form/room-form.component";

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
    BuildingRoomsComponent,
    EventComponent,
    LoginComponent,
    RegisterComponent,
    TimetableComponent,
    BuildingFormComponent,
    RoomFormComponent,
  ],
  entryComponents: [EventComponent, BuildingFormComponent, RoomFormComponent],
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
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
