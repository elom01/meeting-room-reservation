import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { AuthentificationService } from "../authentification.service";
import { User } from "../models/user.model";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginFormHasBeenSubmitted: boolean = false;
  public dataUser: User;
  public isEditForm: boolean;
  public isLoading = new Subject<boolean>();

  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  private getLoginFormData() {
    var form = new FormData();
    form.append("email", this.formLogin.value.email);
    form.append("password", this.formLogin.value.password);
    return form;
  }
  public onLogin() {
    this.loginFormHasBeenSubmitted = true;

    if (!this.formLogin.invalid) {
      this.authService.login(this.getLoginFormData());
    }
  }
}
