import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Meeting } from "../models/meeting.model";

@Injectable({
  providedIn: "root",
})
export class MeetingService {
  private baseUrl: string = environment.apiUrl;
  private uri: string = "meetings";
  public headers = new HttpHeaders({ Accept: "application/json" });
  private currentMeetingDateSubject: BehaviorSubject<string> = new BehaviorSubject("");
  public currentMeetingDateObservable:Observable<string>;

  constructor(private http: HttpClient) {
    this.currentMeetingDateObservable = this.currentMeetingDateSubject.asObservable();
  }
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

  updateMeeting(id: number, meeting: any) {
    return this.http.put<Meeting>(this.baseUrl + this.uri + "/" + id, meeting, {
      headers: this.headers,
    });
  }

  deleteMeeting(id: number) {
    return this.http.delete<Meeting>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  public setMeetingDate(data:string){
    this.currentMeetingDateSubject.next(data);
  }
}
