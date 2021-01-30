import { Building } from "./building.model";
import { Meeting } from "./meeting.model";
import { Timetable } from "./timetables.model";
export interface MeetingRoom {
  id?: number;
  name: string;
  floor: string;
  imageUrl: string;
  building: any;
  meetings?: any;
  meetingRoomTimetables?: any;
}
