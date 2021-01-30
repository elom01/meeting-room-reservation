import { MeetingRoom } from "./room.model";
export interface Timetable {
  id?: number;
  openingTime: string;
  closureTime: string;
  openingDay: string;
  room: any;
}
