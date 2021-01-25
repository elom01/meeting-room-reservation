import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Building } from "../models/building.model";

@Injectable({
  providedIn: "root",
})
export class BuildingService {
  constructor(private http: HttpClient) {}
  getBuildings() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<Building[]>("https://127.0.0.1:8000/api/buildings", {
      headers: headers,
    });
  }
  getBuilding(id: number) {
    return this.http.get<Building>(
      "https://127.0.0.1:8000/api/buildings/" + id
    );
  }
}
