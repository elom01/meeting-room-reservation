import { BuildingService } from './building.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Building } from './building.model';

@Component({
  selector: 'app-building-page',
  templateUrl: './building-page.component.html',
  styleUrls: ['./building-page.component.scss']
})
export class BuildingPageComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  public buildingsList:Building[];

  constructor(private buildingService:BuildingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.buildingService.getBuildings().subscribe(buildings=>{
      this.buildingsList = buildings;
      this.buildingsList = [{id:1,name:'a',address:'address a',city:'city a', zipcode:'12345' },
                            {id:1,name:'b',address:'address b',city:'city b', zipcode:'12345' },
                            {id:1,name:'c',address:'address c',city:'city c', zipcode:'12345' }];
    })
  }
}
