import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Meeting } from "../models/meeting.model";

@Injectable({
  providedIn: "root",
})
export class MeetingService {
  private baseUrl: string = environment.apiUrl;
  private uri: string = "meetings";
  public headers = new HttpHeaders({ Accept: "application/json" });
  constructor(private http: HttpClient) {}
  getMeetings() {
    return this.http.get<Meeting[]>(this.baseUrl + this.uri, {
      headers: this.headers,
    });
  }
  getMeeting(id: number) {
    return this.http.get<Meeting>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  postMeeting(meetingModel: Meeting) {
    return this.http.post(this.baseUrl + this.uri, meetingModel, {
      headers: this.headers,
    });
  }

  updateMeeting(id: number, meeting: Meeting) {
    return this.http.put<Meeting>(this.baseUrl + this.uri + "/" + id, meeting, {
      headers: this.headers,
    });
  }

  deleteMeeting(id: number) {
    return this.http.delete<Meeting>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }
}
