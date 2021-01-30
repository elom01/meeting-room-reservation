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

  public postTimetable(timetableModel: Timetable[]) {
    timetableModel.forEach((element) => {
      if (element.id != null) {
        this.deleteTimeTable(element.id);
      }
      this.http.post(this.baseUrl + this.uri, element, {
        headers: this.headers,
      });
    });
  }

  public deleteTimeTable(id: number) {
    this.http.delete(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }
}
