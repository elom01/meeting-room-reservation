import { BuildingService } from "../../services/building.service";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Building } from "../../models/building.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "building-rooms",
  templateUrl: "./building-rooms.component.html",
  styleUrls: ["./building-rooms.component.scss"],
})
export class BuildingRoomsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public buildingDetail: Building;
  public showBtn:boolean = false;
  @Input() building: Building;
  constructor(private buildingService: BuildingService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnDestroy(): void {
    if (this.building == null) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.building == null) {
      this.subscription = this.buildingService
        .getBuilding(Number(this.activatedRoute.snapshot.paramMap.get("id")))
        .subscribe((building) => {
          this.buildingDetail = building;
        });
    } else {
      this.buildingDetail = this.building;
      this.showBtn = true;
    }
  }
}
