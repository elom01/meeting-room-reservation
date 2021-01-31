import { MeetingRoom } from "./room.model";
import { User } from "./user.model";
export interface Meeting {
  id?: number;
  startDate: string;
  endDate: string;
  user?: any;
  meetingRoom?: any;
}
