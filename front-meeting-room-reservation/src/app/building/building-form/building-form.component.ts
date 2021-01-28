import { BuildingService } from "./../building.service";
import { Building } from "./../../models/building.model";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EventComponent, EventDialogData } from "src/app/event/event.component";
import { Subscription } from "rxjs";

export interface DialogBuildingData {
  building: Building;
}

@Component({
  selector: "building-form",
  templateUrl: "./building-form.component.html",
  styleUrls: ["./building-form.component.scss"],
})
export class BuildingFormComponent implements OnInit {
  private _snackBar: any;
  constructor(
    public dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogBuildingData,
    private buildingService: BuildingService
  ) {}

  ngOnInit() {}

  public saveBuilding(building: Building, id?: number) {
    if (id == null) {
      this.buildingService.postBuilding(building).subscribe((meetings) => {
        this.openSnackBar("");
      });
    } else {
      this.buildingService
        .updateBuilding(id, building)
        .subscribe((meetings) => {
          this.openSnackBar("");
        });
    }
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, {
      duration: 2000,
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
