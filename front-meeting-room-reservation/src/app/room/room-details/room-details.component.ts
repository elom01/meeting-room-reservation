import { BuildingService } from "./../../building/building.service";
import { Building } from "../../models/building.model";
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from "angular-calendar";
import { WeekViewHourSegment } from "calendar-utils";
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { MeetingRoom } from "../../models/room.model";
import { RoomService } from "../room.service";
import { colors } from "./colors";
import { Subject } from "rxjs";
import { addDays, addHours } from "date-fns";

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
  public view: CalendarView = CalendarView.Week;
  public viewDate: Date = new Date();
  public viewChange = new EventEmitter<CalendarView>();
  public viewDateChange = new EventEmitter<Date>();
  public CalendarView = CalendarView;
  public clickedDate: Date;
  public clickedColumn: number;
  public locale: string = "en";

  public events: CalendarEvent[] = [
    {
      title: "Resizable event",
      color: colors.yellow,
      start: new Date(),
      end: addHours(new Date(), 1), // an end date is always required for resizable events to work
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      actions: [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log("Edit event", event);
          },
        },
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log("Event deleted", event);
          },
        },
      ],
    },
    {
      title: "Non editable and deletable event",
      color: colors.red,
      start: addDays(new Date(), 1),
    },
  ];

  public eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh();
  }

  public addEvent(date): void {
    const newEvent: CalendarEvent = {
      id: this.events.length,
      title: "New event",
      start: date,
      end: addHours(date, 1), // an end date is always required for resizable events to work
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      meta: {
        tmpEvent: true,
      },
      actions: [
        {
          label: "<span>X</span>",
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log("Event deleted", event);
          },
        },
      ],
    };
    this.events = [...this.events, newEvent];
    this.refresh();
  }

  public eventClicked({ event }: { event: CalendarEvent }): void {
    console.log("Event clicked", event);
  }
  public changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
        day.cssClass = "bg-red";
      }
    });
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (
            segment.date.getHours() >= 2 &&
            segment.date.getHours() <= 5 &&
            segment.date.getDay() === 2
          ) {
            segment.cssClass = "bg-red";
          }
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
            segment.cssClass = "bg-red";
          }
        });
      });
    });
  }

  constructor(
    private roomService: RoomService,
    private buildingService: BuildingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.roomService
      .getMeetingRoom(1)
      .subscribe((meetingRoom) => {
        this.room = meetingRoom;
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
