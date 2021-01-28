import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class ProfilService {
  baseUrl: String = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUsers() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Accept", "application/json");
    return this.http.get<User[]>(this.baseUrl + "users", {
      headers: headers,
    });
  }
  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }
}
