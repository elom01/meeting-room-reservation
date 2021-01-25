import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MeetingRoom } from "../models/room.model";
import { RoomService } from "./room.service";

@Component({
  selector: "room-page",
  templateUrl: "./room-page.component.html",
  styleUrls: ["./room-page.component.scss"],
})
export class RoomPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public roomsList: MeetingRoom[];

  constructor(private roomService: RoomService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.roomService
      .getMeetingRooms()
      .subscribe((meetingRooms) => {
        this.roomsList = meetingRooms;
      });
  }
}
