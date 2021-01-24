import { BuildingService } from './../building.service';
import { MeetingRoom } from './../../room/room.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Building } from '../building.model';
import { RoomService } from 'src/app/room/room.service';

@Component({
  selector: 'app-building-rooms',
  templateUrl: './building-rooms.component.html',
  styleUrls: ['./building-rooms.component.scss']
})
export class BuildingRoomsComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  public roomsList:MeetingRoom[];
  public buildingDetail:Building;
  constructor(private roomService:RoomService, private buildingService:BuildingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.roomService.getMeetingRooms().subscribe(meetingRooms => {
        this.roomsList = meetingRooms;
        this.roomsList = [{id:1, name:"name room 1", floor:"floor room 1", imageUrl:"https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg"},
        {id:2, name:"name room 2", floor:"floor room 2", imageUrl:"https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg"},
        {id:3, name:"name room 3", floor:"floor room 3", imageUrl:"https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg"},
        {id:4, name:"name room 4", floor:"floor room 4", imageUrl:"https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg"},
        {id:5, name:"name room 5", floor:"floor room 5", imageUrl:"https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg"}
      ];
    });

    this.subscription = this.buildingService.getBuilding(1).subscribe(building => {
        this.buildingDetail = building;
    });
  }

}
