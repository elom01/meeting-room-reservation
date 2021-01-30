import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Router } from "@angular/router";
import { AuthentificationService } from "./services/authentification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public title = "Meeting-Room Reservation";
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  public isAuthenticated: boolean = false;
  constructor(
    public authentificationService: AuthentificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.authentificationService.currentUserValue != null) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  public closeSideNav() {
    this.sidenav.close();
  }
  public openSideNav() {
    this.sidenav.open();
  }

  publiclogout() {
    this.authentificationService.logout();
    location.reload();
  }
}
