import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Meeting } from "../models/meeting.model";
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
  public meetingsList: Meeting[];

  constructor(private profilService: ProfilService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.profilService.getUser(5).subscribe((users) => {
      this.user = users;
    });
    this.subscription = this.profilService
      .getUserMeetings(1)
      .subscribe((meetings) => {
        this.meetingsList = meetings;
      });
  }
}
