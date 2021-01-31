import { Building } from "../../models/building.model";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { MeetingRoom } from "../../models/room.model";
import { RoomService } from "../../services/room.service";
import { Meeting } from "src/app/models/meeting.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "room-details",
  templateUrl: "./room-details.component.html",
  styleUrls: ["./room-details.component.scss"],
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  public showFiller = false;
  private subscription: Subscription;
  public room: MeetingRoom;
  public buildingDetail: Building;

  public dataMeeting: Meeting;

  @ViewChild("id_room", { static: true }) idRoom: ElementRef;

  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.roomService
      .getMeetingRoom(Number(this.activatedRoute.snapshot.paramMap.get("id")))
      .subscribe((meetingRoom) => {
        this.room = meetingRoom;
      });
  }
}
