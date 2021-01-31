import { MeetingService } from './../../services/meeting.service';
import { AuthentificationService } from './../../services/authentification.service';
import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Meeting } from "../../models/meeting.model";
import { User } from "../../models/user.model";
import { ProfilService } from "../../services/profil.service";
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: "profil-page",
  templateUrl: "./profil-page.component.html",
  styleUrls: ["./profil-page.component.scss"],
})
export class ProfilPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public user: User;

  constructor(
    private profilService: ProfilService,
    private authentificationService: AuthentificationService,
    ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    let userId:number = this.authentificationService.currentUserId;
    this.subscription = this.profilService.getUser(userId).subscribe((users) => {
      this.user = users;
    });
  }
}
