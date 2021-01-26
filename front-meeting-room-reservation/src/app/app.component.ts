import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { AuthentificationService } from "./authentification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "front-meeting-room-reservation";
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(public authService: AuthentificationService) {}

  public closeSideNav() {
    this.sidenav.close();
  }
  public openSideNav() {
    this.sidenav.open();
  }
}
