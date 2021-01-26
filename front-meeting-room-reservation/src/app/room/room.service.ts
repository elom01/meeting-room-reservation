import { MeetingRoom } from "../models/room.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  baseUrl: String = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getMeetingRooms() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<MeetingRoom[]>(this.baseUrl + "meeting_rooms", {
      headers: headers,
    });
  }
  getMeetingRoom(id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<MeetingRoom>(this.baseUrl + "meeting_rooms/" + id, {
      headers: headers,
    });
  }

  postMeeting(meetingModel: any) {
    return this.http.post(this.baseUrl + "meeting", meetingModel);
  }
}
