import { MeetingRoom } from "./../models/room.model";
import { Building } from "./../models/building.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BuildingService } from "../building/building.service";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { BuildingFormComponent } from "../building/building-form/building-form.component";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingsList: Building[];
  public meetingRoomsList: MeetingRoom[];
  public building: Building;

  constructor(
    private buildingService: BuildingService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.buildingService
      .getBuildings()
      .subscribe((buildings) => {
        this.buildingsList = buildings;
      });
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
        this.meetingRoomsList = meetingRooms;
      });
  }

  public deleteBuilding() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "300px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.buildingService.deleteBuilding(this.building.id);
      }
    });
  }
}
