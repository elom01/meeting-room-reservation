import { MeetingRoom } from './room.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }
   getMeetingRooms () {
    return this.http.get<MeetingRoom[]>('https://127.0.0.1:8000/api/meeting_rooms');
  }
  getMeetingRoom (id:number) {
    return this.http.get<MeetingRoom>('https://127.0.0.1:8000/api/meeting_rooms/'+id);
  }
}
