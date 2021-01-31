import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthentificationService {
  private baseUrl: string = environment.apiUrl;
  public headers = new HttpHeaders({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private helper = new JwtHelperService();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserId(): number {
    if(!this.currentUserSubject.value) {
      return null;
    }
    return this.helper.decodeToken(this.currentUserSubject.value.token)["id"];
  }


  login(dataLogin: any) {
    return this.http
      .post<any>(this.baseUrl + "login", dataLogin, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  register(userModel: User) {
    console.log(userModel);
    return this.http.post(this.baseUrl + "users", userModel, {
      headers: this.headers,
    });
  }

  public isAdmin(){
    return this.helper.decodeToken(this.currentUserSubject.value.token)['roles'].indexOf("ROLE_ADMIN") !== -1;
  }
}
