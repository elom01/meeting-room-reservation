import { Building } from './../building.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'building-card',
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.scss']
})
export class BuildingCardComponent implements OnInit {

  @Input() building: Building;
  constructor() { }

  ngOnInit() {
  }

}
