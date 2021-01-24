import { BuildingService } from './../../building/building.service';
import { Building } from './../../building/building.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeetingRoom } from '../room.model';
import { RoomService } from '../room.service';
import { CalendarOptions } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {

  private subscription:Subscription;
  public room:MeetingRoom;
  public buildingDetail:Building;
  calendarOptions: CalendarOptions = {
    plugins: [ timeGridPlugin, interactionPlugin ],
    dateClick: function(info) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = 'red';
    },
    initialView: 'timeGridWeek',
    events: [
    {
      start: '2021-01-24T10:00:00',
      end: '2014-01-24T16:00:00',
      display: 'background'
    }

  ]
  };
  constructor(private roomService:RoomService, private buildingService:BuildingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.roomService.getMeetingRoom(1).subscribe(meetingRoom => {
        this.room = meetingRoom;
         console.log("room", this.room)
    });
    this.subscription = this.buildingService.getBuilding(1).subscribe(building => {
        this.buildingDetail = building;
    });
  }

}
