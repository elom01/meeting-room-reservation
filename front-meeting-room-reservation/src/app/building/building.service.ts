import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Building } from './building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http:HttpClient) { }
  getBuildings () {
    return this.http.get<Building[]>('https://127.0.0.1:8000/api/buildings');
  }
  getBuilding (id:number) {
    return this.http.get<Building>('https://127.0.0.1:8000/api/buildings/'+id);
  }
}
