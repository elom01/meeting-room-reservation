import { MeetingRoom } from "./room.model";
export interface Building {
  id: number;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  meetingRooms?: MeetingRoom[];
}
