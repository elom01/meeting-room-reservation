import { BuildingService } from "../../services/building.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Building } from "../../models/building.model";

@Component({
  selector: "building-page",
  templateUrl: "./building-page.component.html",
  styleUrls: ["./building-page.component.scss"],
})
export class BuildingPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingsList: Building[];

  constructor(private buildingService: BuildingService) {}

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
}
