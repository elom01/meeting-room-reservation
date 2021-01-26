import { Timetable } from "./../models/timetables.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TimetableService {
  baseUrl: String = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTimetable() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<Timetable[]>(this.baseUrl + "timetable", {
      headers: headers,
    });
  }

  postTimetable(timetableModel: any) {
    return this.http.post(this.baseUrl + "timetable", timetableModel);
  }
}
