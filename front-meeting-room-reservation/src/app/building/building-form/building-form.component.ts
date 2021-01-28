import { Building } from "./../../models/building.model";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EventComponent, EventDialogData } from "src/app/event/event.component";

export interface DialogBuildingData {
  building: Building;
}

@Component({
  selector: "building-form",
  templateUrl: "./building-form.component.html",
  styleUrls: ["./building-form.component.scss"],
})
export class BuildingFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogBuildingData
  ) {}

  ngOnInit() {
    console.log("clicked");
  }

  public saveBuilding() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
