import { User } from "./models/user.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthentificationService {
  baseUrl: String = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private userSubject = new BehaviorSubject<string>("");
  user$ = this.userSubject.asObservable();

  private helper = new JwtHelperService();
  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  username: string = "";

  constructor(private http: HttpClient) {
    if (this.isAuthenticated()) {
      this.isLoggedInSubject.next(true);
      this.userSubject.next(this.getUsernameFromToken());
      this.isAdminSubject.next(this.checkIfUserIsAdminFromToken());
    }
  }

  register(userModel: any) {
    return this.http.post(this.baseUrl + "user", userModel);
  }

  login(loginModel: any) {
    return this.http
      .post(this.baseUrl + "authentification/login", loginModel)
      .pipe(
        map((response: any) => {
          localStorage.setItem(this.JWT_TOKEN, response.token);
          this.userSubject.next(this.getUsernameFromToken());
          this.isLoggedInSubject.next(true);
          this.isAdminSubject.next(this.checkIfUserIsAdminFromToken());
        })
      );
  }

  logout() {
    this.deleteJwtToken();
    this.userSubject.next("");
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  private deleteJwtToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public isAuthenticated(): boolean {
    const token = this.getJwtToken();

    if (token) {
      let isTokenExpired = this.helper.isTokenExpired(token);
      if (isTokenExpired) this.logout();

      return !isTokenExpired;
    }

    return false;
  }

  private getUsernameFromToken() {
    let decodedToken = this.helper.decodeToken(this.getJwtToken());
    return decodedToken.username;
  }

  private checkIfUserIsAdminFromToken(): boolean {
    let decodedToken = this.helper.decodeToken(this.getJwtToken());
    return decodedToken.isAdmin === "true";
  }
}
