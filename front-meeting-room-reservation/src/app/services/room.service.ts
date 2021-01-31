import { MeetingRoom } from "../models/room.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  private baseUrl: string = environment.apiUrl;
  private uri: string = "meeting_rooms";
  public headers = new HttpHeaders({ Accept: "application/json" });
  constructor(private http: HttpClient) {}
  getMeetingRooms() {
    return this.http.get<MeetingRoom[]>(this.baseUrl + this.uri, {
      headers: this.headers,
    });
  }
  getMeetingRoom(id: number) {
    return this.http.get<MeetingRoom>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  postMeetingRoom(meetingRoomModel: MeetingRoom) {
    return this.http.post(
      this.baseUrl + this.uri,
      meetingRoomModel,
      {
        headers: this.headers,
      }
    );
  }

  updateMeetingRoom(id: number, meetingRoom: MeetingRoom) {
    return this.http.put<MeetingRoom>(
      this.baseUrl + this.uri + "/" + id,
      meetingRoom,
      {
        headers: this.headers,
      }
    );
  }

  deleteMeetingRoom(id: number) {
    return this.http.delete<MeetingRoom>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }
}
