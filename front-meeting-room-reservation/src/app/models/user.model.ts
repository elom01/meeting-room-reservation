import { Meeting } from "./meeting.model";
export interface User {
  id: number;
  familyname: string;
  firstname: string;
  email: string;
  phoneNumber: string;
  password: string;
  meetings?: Meeting[];
}
