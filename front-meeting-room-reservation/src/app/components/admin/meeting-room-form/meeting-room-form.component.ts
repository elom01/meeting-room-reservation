import { MeetingRoom } from './../../../models/room.model';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'meeting-room-form',
  templateUrl: './meeting-room-form.component.html',
  styleUrls: ['./meeting-room-form.component.scss']
})
export class MeetingRoomFormComponent implements OnInit {
  @Input() meetingRoom: MeetingRoom;
  public formMeetingRoom: FormGroup;
  public meetingRoomFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public loading = false;
  public error = "";

  constructor(
        private formBuilder: FormBuilder,
        private meetingRoomService: RoomService,
        private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formMeetingRoom = this.formBuilder.group({
      name: [this.meetingRoom.name, Validators.required],
      floor: [this.meetingRoom.floor, Validators.required],
      imageUrl: [this.meetingRoom.imageUrl, Validators.required],
    });
  }

   get meetingRoomControle() {
      return this.formMeetingRoom.controls;
    }

  private getMeetingRoomData() {
    let newMeetingRoom: MeetingRoom = {
      id: this.meetingRoom.id,
      name: this.formMeetingRoom.value.name,
      floor: this.formMeetingRoom.value.floor,
      imageUrl: this.formMeetingRoom.value.imageUrl,
    };
    return newMeetingRoom;
  }

  public saveMeetingRoom(){
    let meetingRoom:MeetingRoom = this.getMeetingRoomData();
    this.meetingRoomService.updateMeetingRoom(meetingRoom.id, meetingRoom).subscribe((data) => {
        console.log(data);
      });
  }

  public deleteMeetingRoom(){
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.meetingRoomService.deleteMeetingRoom(this.meetingRoom.id).subscribe((data) => {
        console.log(data);
      });
      }
    });

  }

}
