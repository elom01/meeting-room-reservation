import { MeetingRoom } from "./../models/room.model";
import { Building } from "./../models/building.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BuildingService {
  private baseUrl: String = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({
    Accept: "application/json",
  });
  constructor(private http: HttpClient) {}

  postBuilding(building: Building) {
    return this.http.post<Building[]>(this.baseUrl + "buildings", building, {
      headers: this.headers,
    });
  }

  getBuildings() {
    return this.http.get<Building[]>(this.baseUrl + "buildings", {
      headers: this.headers,
    });
  }

  getBuilding(id: number) {
    return this.http.get<Building>(this.baseUrl + "buildings/" + id, {
      headers: this.headers,
    });
  }

  updateBuilding(id: number, building: Building) {
    return this.http.put<Building>(this.baseUrl + "buildings/" + id, building, {
      headers: this.headers,
    });
  }

  deleteBuilding(id: number) {
    return this.http.delete<Building>(this.baseUrl + "buildings/" + id, {
      headers: this.headers,
    });
  }

  getBuildingMeetingRooms(id: number) {
    return this.http.get<MeetingRoom[]>(this.baseUrl + "meeting_rooms/" + id, {
      headers: this.headers,
    });
  }
}
