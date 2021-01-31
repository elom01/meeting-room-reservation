import { TimetableService } from './../../../services/timetable.service';
import { Timetable } from './../../../models/timetables.model';
import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RoomService } from "src/app/services/room.service";
import { MatDialog } from "@angular/material";
import { MeetingRoom } from "src/app/models/room.model";

@Component({
  selector: "timetable-admin",
  templateUrl: "./timetable-admin.component.html",
  styleUrls: ["./timetable-admin.component.scss"],
})
export class TimetableAdminComponent implements OnInit {
  @Input() meetingRoom: any;
  public formTimetable: FormGroup;
  public meetingRoomFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public loading = false;
  public error = "";
  public lundi:Timetable;
  public mardi:Timetable;
  public mercredi:Timetable;
  public jeudi:Timetable;
  public vendredi:Timetable;
  public samedi:Timetable;
  public dimanche:Timetable;
  constructor(
    private formBuilder: FormBuilder,
    private timeTable: TimetableService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
      let lundiId = this.meetingRoom.id;
      let lundiStart = this.meetingRoom.Lundi.start;
      let lundiEnd = this.meetingRoom.Lundi.end;
      let mardiId = this.meetingRoom.id;
      let mardiStart = this.meetingRoom.Mardi.start;
      let mardiEnd = this.meetingRoom.Mardi.end;
      let mercrediId = this.meetingRoom.Mercredi.id;
      let mercrediStart = this.meetingRoom.start;
      let mercrediEnd = this.meetingRoom.Mercredi.end;
      let jeudiId = this.meetingRoom.id;
      let jeudiStart = this.meetingRoom.Jeudi.start;
      let jeudiEnd = this.meetingRoom.Jeudi.end;
      let vendrediId = this.meetingRoom.id;
      let vendrediStart = this.meetingRoom.Vendredi.start;
      let vendrediEnd = this.meetingRoom.Vendredi.end;
      let samediId = this.meetingRoom.id;
      let samediStart = this.meetingRoom.Samedi.start;
      let samediEnd = this.meetingRoom.Samedi.end;
      let dimancheId = this.meetingRoom.id;
      let dimancheStart = this.meetingRoom.Dimanche.start;
      let dimancheEnd = this.meetingRoom.Dimanche.end;

    this.formTimetable = this.formBuilder.group({
      lundiId: [lundiId, null],
      lundiStart: [lundiStart, null],
      lundiEnd: [lundiEnd, null],
      mardiId: [mardiId, null],
      mardiStart: [mardiStart, null],
      mardiEnd: [mardiEnd, null],
      mercrediId: [mercrediId, null],
      mercrediStart: [mercrediStart, null],
      mercrediEnd: [mercrediEnd, null],
      jeudiId: [jeudiId, null],
      jeudiStart: [jeudiStart, null],
      jeudiEnd: [jeudiEnd, null],
      vendrediId: [vendrediId, null],
      vendrediStart: [vendrediStart, null],
      vendrediEnd: [vendrediEnd, null],
      samediId: [samediId, null],
      samediStart: [samediStart, null],
      samediEnd: [samediEnd, null],
      dimancheId: [dimancheId, null],
      dimancheStart: [dimancheStart, null],
      dimancheEnd: [dimancheEnd, null],
    });
  }

  get timetableControle() {
    return this.formTimetable.controls;
  }

  private getTimetableData() {

    this.dimanche["id"] =this.formTimetable["dimancheId"];
    this.dimanche["openingDay"] = "0";
    this.dimanche["meetingRoom"] = {id:this.meetingRoom.id};
    this.dimanche["openingTime"] = this.formTimetable["dimancheStart"];
    this.dimanche["closureTime"] = this.formTimetable["dimancheEnd"];

    this.lundi["id"] =this.formTimetable["lundiId"];
    this.lundi["openingDay"] = "1";
    this.lundi["meetingRoom"] = { id: this.meetingRoom.id };
    this.lundi["openingTime"] = this.formTimetable["lundiStart"];
    this.lundi["closureTime"] = this.formTimetable["lundiEnd"];

    this.mardi["id"] = this.formTimetable["mardiId"];
    this.mardi["openingDay"] = "2";
    this.mardi["meetingRoom"] = { id: this.meetingRoom.id };
    this.mardi["openingTime"] = this.formTimetable["mardiStart"];
    this.mardi["closureTime"] = this.formTimetable["mardiEnd"];

    this.mercredi["id"] =this.formTimetable["mercrediId"];
    this.mercredi["openingDay"] = "3";
    this.mercredi["meetingRoom"] = { id: this.meetingRoom.id };
    this.mercredi["openingTime"] = this.formTimetable["mercrediStart"];
    this.mercredi["closureTime"] = this.formTimetable["mercrediEnd"];

    this.jeudi["id"] =this.formTimetable["jeudiId"];
    this.jeudi["openingDay"] = "4";
    this.jeudi["meetingRoom"] = { id: this.meetingRoom.id };
    this.jeudi["openingTime"] = this.formTimetable["jeudiStart"];
    this.jeudi["closureTime"] = this.formTimetable["jeudiEnd"];

    this.vendredi["id"] =this.formTimetable["vendrediId"];
    this.vendredi["openingDay"] = "5";
    this.vendredi["meetingRoom"] = { id: this.meetingRoom.id };
    this.vendredi["openingTime"] = this.formTimetable["vendrediStart"];
    this.vendredi["closureTime"] = this.formTimetable["vendrediEnd"];

    this.samedi["id"] =this.formTimetable["samediId"];
    this.samedi["openingDay"] = "6";
    this.samedi["meetingRoom"] = { id: this.meetingRoom.id };
    this.samedi["openingTime"] = this.formTimetable["samediStart"];
    this.samedi["closureTime"] = this.formTimetable["samediEnd"];

    let newTimetables: Timetable[] = [
      this.dimanche,
      this.lundi,
      this.mardi,
      this.mercredi,
      this.jeudi,
      this.vendredi,
      this.samedi,
    ];

    return newTimetables;
  }

  public saveTimetable() {
    let timetable: Timetable[] = this.getTimetableData();
    this.timeTable.postTimetable(timetable);
  }
}
