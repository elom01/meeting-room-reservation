import { Building } from "./../models/building.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BuildingService } from "../building/building.service";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { BuildingFormComponent } from "../building/building-form/building-form.component";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingsList: Building[];

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

  public openDialog(): void {
    console.log("open");
    const dialogRef = this.dialog.open(BuildingFormComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("closed");
    });
  }
}
