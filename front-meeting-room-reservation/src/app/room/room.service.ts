import { MeetingRoom } from "../models/room.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}
  getMeetingRooms() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<MeetingRoom[]>(
      "https://127.0.0.1:8000/api/meeting_rooms",
      { headers: headers }
    );
  }
  getMeetingRoom(id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<MeetingRoom>(
      "https://127.0.0.1:8000/api/meeting_rooms/" + id,
      { headers: headers }
    );
  }
}
