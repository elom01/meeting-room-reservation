import { MeetingRoom } from "../../models/room.model";
import { Building } from "../../models/building.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BuildingService } from "../../services/building.service";
import { Subject, Subscription } from "rxjs";
import { MatDialog, MatSnackBar } from "@angular/material";
import { BuildingFormComponent } from "../building/building-form/building-form.component";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { AuthentificationService } from "src/app/services/authentification.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingsList: Building[];
  public meetingRoomsList: object[] = [];
  public building: Building;
  public formMetingRoom: FormGroup;
  public meetingRoomFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public isLoading = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder,
    private buildingService: BuildingService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.formMetingRoom = this.formBuilder.group({
      name: ["", Validators.required],
      floor: ["", Validators.required],
      imageUrl: ["", Validators.required],
    });

    this.subscription = this.buildingService
      .getBuildings()
      .subscribe((buildings) => {
        this.buildingsList = buildings;
      });
  }
private getRegisterFormData() {
    let newMeetingRoom: MeetingRoom = {
      name: this.formMetingRoom.value.name,
      floor: this.formMetingRoom.value.floor,
      imageUrl: this.formMetingRoom.value.imageUrl,
      building:{id:0}
    };
    return newMeetingRoom;
  }

  get meetingRoomControle() {
    return this.formMetingRoom.controls;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialog(building?: Building): void {
    let dialogRef;
    let buildingData = building;
    if (!buildingData) {
      let newBuilding: Building = {
        id: null,
        name: "",
        address: "",
        city: "",
        zipcode: "",
      };

      buildingData = newBuilding;
    }
    console.log("open");
    dialogRef = this.dialog.open(BuildingFormComponent, {
      width: "300px",
      data: {
        building: buildingData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("closed");
    });
  }

  public clickDetailsBuilding(building: Building) {
    this.building = building;
    this.buildingService
      .getBuildingMeetingRooms(building.id)
      .subscribe((meetingRooms) => {
        this.formatTimetable(meetingRooms);
      });
  }

  public deleteBuilding() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.buildingService
          .deleteBuilding(this.building.id)
          .subscribe((building) => {
            console.log(building);
          });
      }
    });
  }

  private formatTimetable(meetingRooms) {
    this.meetingRoomsList = [];
    meetingRooms.forEach((meetingRoom) => {
      let timetable = {
        name: meetingRoom.name,
        floor: meetingRoom.floor,
        imageUrl: meetingRoom.imageUrl,
        Lundi: {
          start: this.findOpeningTime(meetingRoom, 0),
          end: this.findClosureTime(meetingRoom, 0),
        },
        Mardi: {
          start: this.findOpeningTime(meetingRoom, 1),
          end: this.findClosureTime(meetingRoom, 1),
        },
        Mercredi: {
          start: this.findOpeningTime(meetingRoom, 2),
          end: this.findClosureTime(meetingRoom, 2),
        },
        Jeudi: {
          start: this.findOpeningTime(meetingRoom, 3),
          end: this.findClosureTime(meetingRoom, 3),
        },
        Vendredi: {
          start: this.findOpeningTime(meetingRoom, 4),
          end: this.findClosureTime(meetingRoom, 4),
        },
        Samedi: {
          start: this.findOpeningTime(meetingRoom, 5),
          end: this.findClosureTime(meetingRoom, 5),
        },
        Dimanche: {
          start: this.findOpeningTime(meetingRoom, 6),
          end: this.findClosureTime(meetingRoom, 6),
        },
      };
      this.meetingRoomsList.push(timetable);
    });
  }

  private convertToTimeString(datetime) {
    if (datetime) {
      return datetime.split("T")[1].split("+")[0];
    }
    return datetime;
  }

  private findOpeningTime(data: any, day: number) {
    let openDay = data.meetingRoomTimetables.find((tt) => tt.openingDay == day);
    let openingTime = null;
    if (openDay) {
      openingTime = openDay.openingTime;
    }
    return this.convertToTimeString(openingTime);
  }
  private findClosureTime(data: any, day: number) {
    let openDay = data.meetingRoomTimetables.find((tt) => tt.openingDay == day);
    let closureTime = null;
    if (openDay) {
      closureTime = openDay.closureTime;
    }
    return this.convertToTimeString(closureTime);
  }
}