import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Meeting } from "../models/meeting.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class ProfilService {
  private baseUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({
    Accept: "application/json",
  });
  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + "users/" + id, {
      headers: this.headers,
    });
  }

  getUserMeetings(id: number) {
    return this.http.get<Meeting[]>(this.baseUrl + "meetings?user.id=" + id, {
      headers: this.headers,
    });
  }
}
