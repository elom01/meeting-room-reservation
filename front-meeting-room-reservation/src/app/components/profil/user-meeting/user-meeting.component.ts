import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meeting } from 'src/app/models/meeting.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { ProfilService } from 'src/app/services/profil.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'user-meeting',
  templateUrl: './user-meeting.component.html',
  styleUrls: ['./user-meeting.component.scss']
})
export class UserMeetingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public meetingsList:Meeting[];

  constructor(
    private authentificationService: AuthentificationService,
    private meetingService: MeetingService,
    private profilService: ProfilService,
    private dialog: MatDialog,
    private router:Router
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    let userId:number = this.authentificationService.currentUserId;
    this.subscription = this.profilService
      .getUserMeetings(userId)
      .subscribe((meetings) => {
        this.meetingsList = meetings;
      });
  }

   public deleteMeeting(id:number){
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.meetingService.deleteMeeting(id).subscribe((data) => {
        console.log("Ok");
      });
      }
    });
  }
  public showCalendar(id:number, dateMeeting:string){
    this.meetingService.setMeetingDate(dateMeeting);
    this.router.navigate(['/room', id])
  }

}
