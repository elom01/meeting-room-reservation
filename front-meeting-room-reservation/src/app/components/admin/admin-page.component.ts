import { AddMeetingRoomFormComponent } from './add-meeting-room-form/add-meeting-room-form.component';
import { MeetingRoom } from './../../models/room.model';
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
import { RoomService } from "src/app/services/room.service";

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

  constructor(
    private _snackBar: MatSnackBar,
    private buildingService: BuildingService,
    private dialog: MatDialog,
    private matSnackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.subscription = this.buildingService
      .getBuildings()
      .subscribe((buildings) => {
        this.buildingsList = buildings;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialogBuilding(building?: Building): void {
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
    });
  }

  public openDialogMeetingRoom(id: number): void {
    let dialogRef = this.dialog.open(AddMeetingRoomFormComponent, {
      width: "300px",
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public clickDetailsBuilding(building: Building) {
    this.building = building;
    this.buildingService
      .getBuildingMeetingRooms(building.id)
      .subscribe((meetingRooms) => {
        this.formatTimetable(meetingRooms);
      },(error)=>{
        this.showSuccessSnackbar("Une erreur s'est produite", 5000);
      });
  }

  // public deleteBuilding() {
  //   let dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: "300px",
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.buildingService
  //         .deleteBuilding(this.building.id)
  //         .subscribe((building) => {
  //           console.log(building);
  //           this.showErrorSnackbar("Le bâtiement a bien été supprimé",5000);
  //         },(error)=>{
  //           this.showSuccessSnackbar("Une erreur s'est produite",5000);
  //         });
  //     }
  //   });
  // }

  private formatTimetable(meetingRooms) {
    this.meetingRoomsList = [];
    meetingRooms.forEach((meetingRoom) => {
      let timetable = {
        id: meetingRoom.id,
        name: meetingRoom.name,
        floor: meetingRoom.floor,
        imageUrl: meetingRoom.imageUrl,
        Lundi: {
          id: this.findIdDay(meetingRoom, 1),
          start: this.findOpeningTime(meetingRoom, 1),
          end: this.findClosureTime(meetingRoom, 1),
        },
        Mardi: {
          id: this.findIdDay(meetingRoom, 2),
          start: this.findOpeningTime(meetingRoom, 2),
          end: this.findClosureTime(meetingRoom, 2),
        },
        Mercredi: {
          id: this.findIdDay(meetingRoom, 3),
          start: this.findOpeningTime(meetingRoom, 3),
          end: this.findClosureTime(meetingRoom, 3),
        },
        Jeudi: {
          id: this.findIdDay(meetingRoom, 4),
          start: this.findOpeningTime(meetingRoom, 4),
          end: this.findClosureTime(meetingRoom, 4),
        },
        Vendredi: {
          id: this.findIdDay(meetingRoom, 5),
          start: this.findOpeningTime(meetingRoom, 5),
          end: this.findClosureTime(meetingRoom, 5),
        },
        Samedi: {
          id: this.findIdDay(meetingRoom, 6),
          start: this.findOpeningTime(meetingRoom, 6),
          end: this.findClosureTime(meetingRoom, 6),
        },
        Dimanche: {
          id: this.findIdDay(meetingRoom, 0),
          start: this.findOpeningTime(meetingRoom, 0),
          end: this.findClosureTime(meetingRoom, 0),
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

  private findIdDay(data: any, day: number) {
    let openDay = data.meetingRoomTimetables.find((tt) => tt.openingDay == day);
    let id = null;
    if (openDay) {
      id = openDay.id;
    }
    return id;
  }


  private showErrorSnackbar(
    message,
    duration,
    action = null,
    className = "red-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }

  private showSuccessSnackbar(
    message,
    duration,
    action = null,
    className = "green-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }

}
