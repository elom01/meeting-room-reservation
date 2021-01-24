import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeetingRoom } from './room.model';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss']
})
export class RoomPageComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  public roomsList:MeetingRoom[];

  constructor(private roomService:RoomService) { }

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
  }

}
