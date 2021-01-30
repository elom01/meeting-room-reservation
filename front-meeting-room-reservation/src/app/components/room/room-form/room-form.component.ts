import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { build$ } from "protractor/built/element";
import { Subject } from "rxjs";
import { MeetingRoom } from "src/app/models/room.model";
import { AuthentificationService } from "src/app/services/authentification.service";

@Component({
  selector: "room-form",
  templateUrl: "./room-form.component.html",
  styleUrls: ["./room-form.component.scss"],
})
export class RoomFormComponent implements OnInit {
  public formMeetingRoom: FormGroup;
  public meetingRoomFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public isLoading = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formMeetingRoom = this.formBuilder.group({
      name: ["", Validators.required],
      floor: ["", Validators.required],
      imageUrl: ["", Validators.required]
    });
  }
private getRegisterFormData() {
    let newMeetingRoom: MeetingRoom = {
      name: this.formMeetingRoom.value.name,
      floor: this.formMeetingRoom.value.floor,
      imageUrl: this.formMeetingRoom.value.imageUrl,
      building: {id:1}
    };
    return newMeetingRoom;
  }

  get meetingRoomControle() {
    return this.formMeetingRoom.controls;
  }

  public saveRoom(){

  }
}
