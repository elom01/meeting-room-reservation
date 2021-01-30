import { BuildingService } from "../../services/building.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Building } from "../../models/building.model";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit, OnDestroy {
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
