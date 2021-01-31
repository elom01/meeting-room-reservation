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
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "timetable",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"],
})
export class TimetableComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public view: CalendarView = CalendarView.Week;
  public isAuthenticated: boolean = false;
  public viewDate: Date = new Date();
  public viewChange = new EventEmitter<CalendarView>();
  public viewDateChange = new EventEmitter<Date>();
  public CalendarView = CalendarView;
  public clickedDate: Date;
  public clickedColumn: number;
  public locale: string = "en";
  public timetable: Timetable[];
  private newEvent: CalendarEvent;
  public currentMeetingDate: string;
  public ifDataLoaded: boolean = false;
  public idMeeting: number;
  @Input() meetings: Meeting[];
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  @Input() idRoom;
  public oldEvents: CalendarEvent[] = [];
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
      label: "<i>X</i>",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteMeeting(event);
      },
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.subscription = this.timetableService
      .getTimetable()
      .subscribe((timetable) => {
        this.timetable = timetable;
        this.ifDataLoaded = true;
      });
    if (this.meetings) {
      this.convertToEvents(this.meetings);
    }

    if (this.authentificationService.currentUserValue != null) {
      this.isAuthenticated = true;
    }

    this.meetingService.currentMeetingDateObservable.subscribe((date) => {
      this.currentMeetingDate = date;
      if (date != "") {
        this.viewDate = new Date(date);
      }
    });
  }

  private convertToEvents(meetings: Meeting[]) {
    let newEvents = [];
    meetings.forEach((meeting) => {
      let newEvent: CalendarEvent = {
        id: meeting.id,
        title: "Réservée",
        start: new Date(meeting.startDate),
        end: new Date(meeting.endDate),
      };
      if (this.authentificationService.currentUserId == meeting.user.id) {
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
    let valideDate = this.controleDate(event);
    if (!valideDate.valide) {
      this.showErrorSnackbar(valideDate.error, 5000);
      this.refresh();
      return;
    }
    this.newEvent = event;

    if (event.id) {
      this.updateMeeting(Number(event.id));
    }
    this.refresh();
  }

  public eventClicked({ event }: { event: CalendarEvent }): void {
    if (
      event.start > new Date() &&
      this.authentificationService.currentUserValue
    ) {
      // et si c'est l'evenement de l'utilisateur
      console.log("Event clicked", event);
      this.newEvent = event;
      this.openDialog();
    }
  }

  public changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  public beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          let dateNow: Date = new Date();
          if (segment.date < dateNow) {
            segment.cssClass = "date-passed";
          }
        });
      });
    });
    this.timetable.forEach((day) => {
      renderEvent.hourColumns.forEach((hourColumn) => {
        hourColumn.hours.forEach((hour) => {
          hour.segments.forEach((segment) => {
            let openingHour: Date = new Date(day.openingTime);
            let closureHour: Date = new Date(day.closureTime);
            if (
              (Number(day.openingDay) == segment.date.getDay() &&
                segment.date.getHours() < openingHour.getHours()) ||
              segment.date.getHours() > closureHour.getHours()
            ) {
              segment.cssClass = "date-off";
            }
          });
        });
      });
    });
  }

  public addEvent(date): void {
    if (!this.isAuthenticated) {
      this.showErrorSnackbar(
        "Vous n'êtes pas connecté(e). Veuillez vous connecter ou vous inscrire",
        null,
        5000
      );
      return;
    } else {
      this.newEvent = {
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
            },
          },
        ],
      };
      let valideDate = this.controleDate(this.newEvent);
      if (!valideDate.valide) {
        this.showErrorSnackbar(valideDate.error, null, 5000);
        this.refresh();
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
          this.createMeeting();

          this.oldEvents = this.events;
          this.refresh();
        } else {
          this.showErrorSnackbar(valideDate.error, null, 5000);
          this.deleteMeeting(this.newEvent);
          this.refresh();
          return;
        }
      }
    });
  }

  private controleDate(eventAdded: CalendarEvent) {
    let valideDate = true;
    let msgError = "";

    if (eventAdded.start < new Date()) {
      valideDate = false;
      msgError = "La date sélectionnée est passée";
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

    this.timetable.forEach((day) => {
      let openingHour: Date = new Date(day.openingTime);
      let closureHour: Date = new Date(day.closureTime);
      if (
        Number(day.openingDay) == eventAdded.start.getDay() &&
        (eventAdded.start.getHours() < openingHour.getHours() ||
          eventAdded.end.getHours() > closureHour.getHours())
      ) {
        valideDate = false;
        msgError = "La salle est fermée aux horaires sélectionnés";
      }
    });

    this.oldEvents.forEach((event) => {
      if (eventAdded.id != event.id) {
        if (
          (eventAdded.start >= event.start && eventAdded.end <= event.end) ||
          (eventAdded.start <= event.start && eventAdded.end >= event.end) ||
          (eventAdded.start <= event.start &&
            eventAdded.end <= event.end &&
            eventAdded.end >= event.start) ||
          (eventAdded.start >= event.start && eventAdded.start <= event.end)
        ) {
          valideDate = false;
          msgError =
            "Cette salle est déjà reservée aux horaires choisis. Veuillez modifier votre réservation";
        }
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

  private getMeeetingForm() {
    let meeting: Meeting = {
      meetingRoom: {
        id: Number(this.activatedRoute.snapshot.paramMap.get("id")),
      },
      startDate: this.newEvent.start.toISOString(),
      endDate: this.newEvent.end.toISOString(),
      user: { id: this.authentificationService.currentUserId },
    };

    return meeting;
  }

  public createMeeting() {
    this.meetingService
      .postMeeting(this.getMeeetingForm())
      .subscribe((meeting) => {
        this.showSuccessSnackbar("Ajout effectué", 5000);
      },
        (err) => {
          this.showErrorSnackbar("Une erreur s'est produite", 5000);
        });
  }

  public updateMeeting(id: number) {
    this.meetingService
      .updateMeeting(id, this.getMeeetingForm())
      .subscribe((meeting) => {
        this.showSuccessSnackbar("Modificationn effectuée", 5000);
      },
        (err) => {
          this.showErrorSnackbar("Une erreur s'est produite", 5000);
        });
  }

  public deleteMeeting(event: CalendarEvent) {
    if (event.id) {
      this.meetingService.deleteMeeting(Number(event.id)).subscribe(
        (meeting) => {
          this.showSuccessSnackbar("Supression effectuée", 5000);
        },
        (err) => {
          this.showErrorSnackbar("Une erreur s'est produite", 5000);
        }
      );
    }
    this.events = this.events.filter((iEvent) => iEvent !== event);
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  private showErrorSnackbar(
    message,
    duration,
    action = null,
    className = "red-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }

  private showSuccessSnackbar(
    message,
    duration,
    action = null,
    className = "green-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
