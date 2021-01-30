import { MeetingRoom } from "../models/room.model";
import { Building } from "../models/building.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BuildingService {
  private baseUrl: string = environment.apiUrl;
  private uri: string = "buildings";
  private headers: HttpHeaders = new HttpHeaders({
    Accept: "application/json",
  });
  constructor(private http: HttpClient) {}

  postBuilding(building: Building) {
    return this.http.post<Building[]>(this.baseUrl + this.uri, building, {
      headers: this.headers,
    });
  }

  getBuildings() {
    return this.http.get<Building[]>(this.baseUrl + this.uri, {
      headers: this.headers,
    });
  }

  getBuilding(id: number) {
    return this.http.get<Building>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  updateBuilding(id: number, building: Building) {
    return this.http.put<Building>(
      this.baseUrl + this.uri + "/" + id,
      building,
      {
        headers: this.headers,
      }
    );
  }

  deleteBuilding(id: number) {
    return this.http.delete<Building>(this.baseUrl + this.uri + "/" + id, {
      headers: this.headers,
    });
  }

  getBuildingMeetingRooms(id: number) {
    return this.http.get<MeetingRoom[]>(
      this.baseUrl + "meeting_rooms?building.id=" + id,
      {
        headers: this.headers,
      }
    );
  }
}
