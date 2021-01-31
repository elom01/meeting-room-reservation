import { MeetingRoom } from "./../../../models/room.model";
import { Component, Inject, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { RoomService } from "src/app/services/room.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { DeleteDialogComponent } from "../../delete-dialog/delete-dialog.component";


@Component({
  selector: "add-meeting-room-form",
  templateUrl: "./add-meeting-room-form.component.html",
  styleUrls: ["./add-meeting-room-form.component.scss"],
})
export class AddMeetingRoomFormComponent implements OnInit {
  public formMeetingRoom: FormGroup;
  public meetingRoomFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public loading = false;
  public error = "";

  constructor(
    private formBuilder: FormBuilder,
    private meetingRoomService: RoomService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
  ) {}

  ngOnInit() {
    this.formMeetingRoom = this.formBuilder.group({
      name: ["", Validators.required],
      floor: ["", Validators.required],
      imageUrl: [
        "https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg",
        Validators.required,
      ],
    });
  }

  get meetingRoomControle() {
    return this.formMeetingRoom.controls;
  }

  private getMeetingRoomData() {
    console.log(this.data);
    let newMeetingRoom: MeetingRoom = {
      name: this.formMeetingRoom.value.name,
      floor: this.formMeetingRoom.value.floor,
      imageUrl: this.formMeetingRoom.value.imageUrl,
      building: {id:this.data},
    };
    return newMeetingRoom;
  }

  public saveMeetingRoom() {
    let meetingRoom: MeetingRoom = this.getMeetingRoomData();
    this.meetingRoomService
      .postMeetingRoom( meetingRoom)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
