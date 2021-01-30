import { Meeting } from "../../models/meeting.model";
import { TimetableService } from "../../services/timetable.service";
import { MeetingService } from "../../services/meeting.service";
import { Timetable } from "../../models/timetables.model";
import { AuthentificationService } from "../../services/authentification.service";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog, MatSidenav, MatSnackBar } from "@angular/material";
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from "angular-calendar";
import { addDays, addHours, format } from "date-fns";
import { RoomService } from "../../services/room.service";
import { colors } from "./colors";
import { EventComponent } from "../event/event.component";
import { Subscription } from "rxjs";

@Component({
  selector: "timetable",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"],
})
export class TimetableComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public view: CalendarView = CalendarView.Week;
  public isAuthenticated: boolean;
  public viewDate: Date = new Date();
  public viewChange = new EventEmitter<CalendarView>();
  public viewDateChange = new EventEmitter<Date>();
  public CalendarView = CalendarView;
  public clickedDate: Date;
  public clickedColumn: number;
  public locale: string = "en";
  public timetable: Timetable[];
  private newEvent: CalendarEvent;
  @Input() meetings: Meeting[];
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  @Input() idRoom;
  public oldEvents: CalendarEvent[];
  public events: CalendarEvent[] = [];
  private resizableForUser: object = {
    beforeStart: true, // this allows you to configure the sides the event is resizable from
    afterEnd: true,
  };
  private actionForUser = [
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
  ];

  constructor(
    private meetingService: MeetingService,
    private cdr: ChangeDetectorRef,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    private timetableService: TimetableService,
    private authentificationService: AuthentificationService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    if (this.authentificationService.currentUserValue != null) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    this.subscription = this.timetableService
      .getTimetable()
      .subscribe((timetable) => {
        this.timetable = timetable;
      });
    if (this.meetings) {
      this.convertToEvents(this.meetings);
    }
  }

  private convertToEvents(meetings: Meeting[]) {
    let newEvents = [];
    meetings.forEach((meeting) => {
      let newEvent: CalendarEvent = {
        title: "Réservé",
        start: new Date(meeting.startDate),
        end: new Date(meeting.endDate),
      };
      if (this.authentificationService.currentUserId == meeting.user.id){
        newEvent.color = colors.green;
        newEvent.resizable = this.resizableForUser;
        newEvent.actions = this.actionForUser;
        newEvent.draggable = true;
      }
      newEvents.push(newEvent);
      this.oldEvents = newEvents;
      this.events = newEvents;
    });
  }

  public eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh();
  }

  public eventClicked({ event }: { event: CalendarEvent }): void {
    if(event.start > new Date() && this.authentificationService.currentUserValue){// et si c'est l'evenement de l'utilisateur
      console.log("Event clicked", event);
      this.newEvent = event;
      this.openDialog();
    }

  }
  public changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  public beforeMonthViewRender(
    renderEvent: CalendarMonthViewBeforeRenderEvent
  ): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
        day.cssClass = "bg-red";
      }
    });
  }

  public beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
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

  public beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
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

  public createMeeting() {
    this.meetingService
      .postMeeting(this.getMeeetingForm())
      .subscribe((meeting) => {});
  }

  private getMeeetingForm() {
    let meeting: Meeting = {
      meetingRoom: {id:this.idRoom.nativeElement.value},
      startDate: this.newEvent.start.toISOString(),
      endDate: this.newEvent.end.toISOString(),
      user: {id:this.authentificationService.currentUserId},
    };

    return meeting;
  }

  public addEvent(date): void {
    if (!this.isAuthenticated) {
      this.showSnackbar(
        "Vous n'êtes pas connecté(e). Veuillez vous connecter ou vous inscrire",
        null,
        5000
      );
      return;
    } else {
      this.newEvent = {
        id: this.events.length,
        title: "Réservation",
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
      let valideDate = this.controleDate(this.newEvent);
      if (valideDate.valide) {
        this.refresh();
      } else {
        this.showSnackbar(valideDate.error, null, 5000);
        return;
      }
      this.events = [...this.events, this.newEvent];
      this.refresh();
      this.openDialog();
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(EventComponent, {
      width: "300px",
      data: {
        date: this.newEvent.start.toLocaleDateString(),
        start: format(this.newEvent.start, "HH:mm"),
        end: format(addHours(this.newEvent.start, 1), "HH:mm"),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newStart = new Date(
          this.formatStringToDate(result.date) + " " + result.start
        );
        let newEnd = new Date(
          this.formatStringToDate(result.date) + " " + result.end
        );
        this.newEvent.start = newStart;
        this.newEvent.end = newEnd;
        let valideDate = this.controleDate(this.newEvent);
        if (valideDate.valide) {
          //if (){
          //this.updateMeeting(this.newEvent);
        //}else{
          this.createMeeting();
        //}
          this.oldEvents = this.events;
          this.refresh();
        } else {
          this.showSnackbar(valideDate.error, null, 5000);
          return;
        }
        // if (){
        //   return;
        // }
        this.deleteMeetings(this.newEvent);
      }
    });
  }

  private controleDate(eventAdded: CalendarEvent) {
    let valideDate = true;
    let msgError = "";

    if (eventAdded.start < new Date()) {
      valideDate = false;
      msgError =
        "La date sélectionnée est passée";
    }
    if (eventAdded.start == eventAdded.end) {
      valideDate = false;
      msgError =
        "La date de début de reservation ne peut pas être la même que la date de fin";
    }
    if (eventAdded.start >= eventAdded.end) {
      valideDate = false;
      msgError =
        "La date de début de reservation ne peut pas être supérieure à la date de fin";
    }
    this.oldEvents.forEach((event) => {
      if (
        (eventAdded.start >= event.start && eventAdded.end <= event.end) ||
        (eventAdded.start <= event.start && eventAdded.end >= event.end) ||
        (eventAdded.start <= event.start &&
          eventAdded.end <= event.end &&
          eventAdded.end >= event.start) ||
        (eventAdded.start >= event.start && this.newEvent.start <= event.end)
      ) {
        valideDate = false;
        msgError =
          "Cette salle est déjà reservée aux horaires choisis. Veuillez modifier votre réservation";
      }
    });
    let error = {
      valide: valideDate,
      error: msgError,
    };
    return error;
  }

  public formatStringToDate(dateString: string) {
    let splitDate = dateString.split("/");
    let date = splitDate[1] + "-" + splitDate[0] + "-" + splitDate[2];
    return date;
  }

  public updateMeeting(event:CalendarEvent) {
    //this.meetingService.updateMeeting();
  }

  public deleteMeetings(event:CalendarEvent) {
    this.events = this.events.filter((iEvent) => iEvent !== event);
    //this.meetingService.deleteMeeting();
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  private showSnackbar(message, action, duration, className = "red-snackbar") {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
