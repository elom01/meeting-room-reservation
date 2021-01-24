import { Component, Input, OnInit } from '@angular/core';
import { MeetingRoom } from '../room.model';

@Component({
  selector: 'room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {

  @Input() room:MeetingRoom;
  constructor() { }

  ngOnInit() {
  }

}
