import { Component, OnInit } from "@angular/core";

@Component({
  selector: "building-form",
  templateUrl: "./building-form.component.html",
  styleUrls: ["./building-form.component.scss"],
})
export class BuildingFormComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("clicked");
  }

  public saveBuilding() {}
}
