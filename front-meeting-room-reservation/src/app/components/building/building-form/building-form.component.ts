import { BuildingService } from "../../../services/building.service";
import { Building } from "../../../models/building.model";
import { Component, EventEmitter, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  EventComponent,
  EventDialogData,
} from "src/app/components/event/event.component";
import { Subject, Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  public isEditForm: boolean;
  public formBuilding: FormGroup;
  public buildingFormHasBeenSubmitted: boolean = false;
  public isLoading = new Subject<boolean>();
  constructor(
    public dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogBuildingData,
    private buildingService: BuildingService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.formBuilding = this.formBuilder.group({
      id: [this.data.building.id,null],
      name: [this.data.building.name, Validators.required],
      address: [this.data.building.address, Validators.required],
      city: [this.data.building.city, Validators.required],
      zipcode: [this.data.building.zipcode, Validators.required],
    });
  }

  private getBuildingFormData() {
    let newBuilding: Building = {
      id:this.formBuilding.value.id,
      name: this.formBuilding.value.name,
      address: this.formBuilding.value.address,
      city: this.formBuilding.value.city,
      zipcode: this.formBuilding.value.zipcode,
    };
    return newBuilding;
  }

  get formBuildingControle() {
    return this.formBuilding.controls;
  }

  public saveBuilding(id?:number) {
    let building:Building = this.getBuildingFormData();
    if (!id) {
      console.log(EventEmitter)
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
