import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../models/user.model";
import { ProfilService } from "./profil.service";

@Component({
  selector: "profil-page",
  templateUrl: "./profil-page.component.html",
  styleUrls: ["./profil-page.component.scss"],
})
export class ProfilPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public user: User;

  constructor(private profilService: ProfilService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.profilService.getUser(5).subscribe((users) => {
      this.user = users;
    });
  }
}
