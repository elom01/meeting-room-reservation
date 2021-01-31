import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RoomPageComponent } from "./components/room/room-page.component";
import { HomePageComponent } from "./components/home/home-page.component";
import { BuildingPageComponent } from "./components/building/building-page.component";
import { AdminPageComponent } from "./components/admin/admin-page.component";
import { ProfilPageComponent } from "./components/profil/profil-page.component";
import { RoomDetailsComponent } from "./components/room-details/room-details.component";
import { BuildingCardComponent } from "./components/building/building-card/building-card.component";
import { RoomCardComponent } from "./components/room/room-card/room-card.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { BuildingRoomsComponent } from "./components/building-rooms/building-rooms.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { TimetableComponent } from "./components/timetable/timetable.component";
import { BuildingFormComponent } from "./components/building/building-form/building-form.component";
import { RoomFormComponent } from "./components/room/room-form/room-form.component";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { JwtModule } from "@auth0/angular-jwt";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ErrorInterceptor } from "./helpers/error.interceptor";
import { EventComponent } from "./components/event/event.component";
import { MeetingRoomFormComponent } from './components/admin/meeting-room-form/meeting-room-form.component';
import { TimetableAdminComponent } from './components/admin/timetable-admin/timetable-admin.component';
import { UserMeetingComponent } from './components/profil/user-meeting/user-meeting.component';
import { AddMeetingRoomFormComponent } from './components/admin/add-meeting-room-form/add-meeting-room-form.component';

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
    DeleteDialogComponent,
    MeetingRoomFormComponent,
    TimetableAdminComponent,
    UserMeetingComponent,
    AddMeetingRoomFormComponent,
  ],
  entryComponents: [
    EventComponent,
    BuildingFormComponent,
    RoomFormComponent,
    DeleteDialogComponent,
    AddMeetingRoomFormComponent,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
