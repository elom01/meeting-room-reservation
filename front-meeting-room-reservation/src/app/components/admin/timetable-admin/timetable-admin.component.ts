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
      let lundiId = this.meetingRoom.Lundi.id;
      let lundiStart = this.meetingRoom.Lundi.start ? String(this.meetingRoom.Lundi.start) : "00:00";
      let lundiEnd = this.meetingRoom.Lundi.end ? String(this.meetingRoom.Lundi.end) : "00:00";

      let mardiId = this.meetingRoom.Mardi.id;
      let mardiStart = this.meetingRoom.Mardi.start ? String(this.meetingRoom.Mardi.start) : "00:00";
      let mardiEnd = this.meetingRoom.Mardi.end ? String(this.meetingRoom.Mardi.end) : "00:00";

      let mercrediId = this.meetingRoom.Mercredi.id;
      let mercrediStart = this.meetingRoom.Mercredi.start ? String(this.meetingRoom.Mercredi.start) : "00:00";
      let mercrediEnd = this.meetingRoom.Mercredi.end ? String(this.meetingRoom.Mercredi.end) : "00:00";

      let jeudiId = this.meetingRoom.Jeudi.id;
      let jeudiStart = this.meetingRoom.Jeudi.start ? String(this.meetingRoom.Jeudi.start) : "00:00";
      let jeudiEnd = this.meetingRoom.Jeudi.end ? String(this.meetingRoom.Jeudi.end) : "00:00";

      let vendrediId = this.meetingRoom.Vendredi.id;
      let vendrediStart = this.meetingRoom.Vendredi.start ? String(this.meetingRoom.Vendredi.start) : "00:00";
      let vendrediEnd = this.meetingRoom.Vendredi.end ? String(this.meetingRoom.Vendredi.end) : "00:00";

      let samediId = this.meetingRoom.Samedi.id;
      let samediStart = this.meetingRoom.Samedi.start ? String(this.meetingRoom.Samedi.start) : "00:00";
      let samediEnd = this.meetingRoom.Samedi.end ? String(this.meetingRoom.Samedi.end) : "00:00";

      let dimancheId = this.meetingRoom.Dimanche.id;
      let dimancheStart = this.meetingRoom.Dimanche.start ? String(this.meetingRoom.Dimanche.start) : "00:00";
      let dimancheEnd = this.meetingRoom.Dimanche.end ? String(this.meetingRoom.Dimanche.end) : "00:00";

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

    this.dimanche = {
      id :this.formTimetable.get("dimancheId").value,
      openingDay : 0,
      meetingRoom : {id:this.meetingRoom.id},
      openingTime : this.formTimetable.get("dimancheStart").value? this.formTimetable.get("dimancheStart").value : "00:00",
      closureTime : this.formTimetable.get("dimancheEnd").value ? this.formTimetable.get("dimancheEnd").value : "00:00"
    }

    this.lundi = {
      id: this.formTimetable.get("lundiId").value,
      openingDay: 1,
      meetingRoom: { id: this.meetingRoom.id },
      openingTime: this.formTimetable.get("lundiStart").value
        ? this.formTimetable.get("dimancheEnd").value
        : "00:00",
      closureTime: this.formTimetable.get("lundiEnd").value
        ? this.formTimetable.get("dimancheEnd").value
        : "00:00",
    };

    this.mardi={
      id : this.formTimetable.get("mardiId").value,
      openingDay : 2,
      meetingRoom : { id: this.meetingRoom.id },
      openingTime : this.formTimetable.get("mardiStart").value,
      closureTime : this.formTimetable.get("mardiEnd").value
    }

    this.mercredi={
      id :this.formTimetable.get("mercrediId").value,
      openingDay : 3,
      meetingRoom : { id: this.meetingRoom.id },
      openingTime : this.formTimetable.get("mercrediStart").value,
      closureTime : this.formTimetable.get("mercrediEnd").value
    }

    this.jeudi = {
      id: this.formTimetable.get("jeudiId").value,
      openingDay: 4,
      meetingRoom: { id: this.meetingRoom.id },
      openingTime: this.formTimetable.get("jeudiStart").value,
      closureTime: this.formTimetable.get("jeudiEnd").value,
    };

    this.vendredi={
      id :this.formTimetable.get("vendrediId").value,
      openingDay : 5,
      meetingRoom : { id: this.meetingRoom.id },
      openingTime : this.formTimetable.get("vendrediStart").value,
      closureTime : this.formTimetable.get("vendrediEnd").value
    }

    this.samedi={
      id :this.formTimetable.get("samediId").value,
      openingDay : 6,
      meetingRoom : { id: this.meetingRoom.id },
      openingTime : this.formTimetable.get("samediStart").value,
      closureTime : this.formTimetable.get("samediEnd").value
    }

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
    console.log(timetable);
    this.timeTable.addTimetables(timetable);
  }
}
