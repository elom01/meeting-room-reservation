import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Building } from "../models/building.model";

@Injectable({
  providedIn: "root",
})
export class BuildingService {
  baseUrl: String = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getBuildings() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<Building[]>(this.baseUrl + "buildings", {
      headers: headers,
    });
  }
  getBuilding(id: number) {
    return this.http.get<Building>(this.baseUrl + "buildings/" + id);
  }
}
