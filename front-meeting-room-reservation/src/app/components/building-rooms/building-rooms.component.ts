import { BuildingService } from "../../services/building.service";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Building } from "../../models/building.model";

@Component({
  selector: "building-rooms",
  templateUrl: "./building-rooms.component.html",
  styleUrls: ["./building-rooms.component.scss"],
})
export class BuildingRoomsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingDetail: Building;
  @Input() building: Building;
  constructor(private buildingService: BuildingService) {}

  ngOnDestroy(): void {
    if (this.building == null) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.building == null) {
      this.subscription = this.buildingService
        .getBuilding(1)
        .subscribe((building) => {
          this.buildingDetail = building;
        });
    } else {
      this.buildingDetail = this.building;
    }
  }
}