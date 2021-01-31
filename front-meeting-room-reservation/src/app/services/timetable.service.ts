import { Timetable } from "./../models/timetables.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TimetableService {
  private baseUrl: string = environment.apiUrl;
  private uri: string = "meeting_room_timetables";
  private headers: HttpHeaders = new HttpHeaders({
    Accept: "application/json",
  });
  constructor(private http: HttpClient) {}

  public getTimetable() {
    return this.http.get<Timetable[]>(this.baseUrl + this.uri, {
      headers: this.headers,
    });
  }

  public getRoomTimetable(id:number) {
    return this.http.get<Timetable[]>(
      this.baseUrl + this.uri + "?meetingRoom.id=" + id,
      {
        headers: this.headers,
      }
    );
  }

  public addTimetables(timetableList: Timetable[]) {
    timetableList.forEach((timetable) => {
      if (timetable.id != null) {
        this.deleteTimeTable(timetable.id).subscribe((data) => {
          timetable.id = null;
          this.postTimetable(timetable).subscribe((meeting) => {});
        });
      } else {
        this.postTimetable(timetable).subscribe((meeting) => {});
      }
    });
  }

  private postTimetable(timetable: Timetable) {
    return this.http.post(this.baseUrl + this.uri, timetable, {
      headers: this.headers,
    });
  }

  private updateTimeTable(id: number, timetable: Timetable) {
    return this.http.put(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  private deleteTimeTable(id: number) {
    return this.http.delete(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }
}
