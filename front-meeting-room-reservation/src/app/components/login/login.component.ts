import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { AuthentificationService } from "../../services/authentification.service";
import { first } from "rxjs/operators";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public loginFormHasBeenSubmitted: boolean = false;
  public isEditForm: boolean;
  public loading = false;
  public error = "";

  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get formLoginControle() {
    return this.formLogin.controls;
  }
  private getLoginFormData() {
    var form: object = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };
    return form;
  }

  public onLogin() {
    this.loading = true;
    if (!this.formLogin.invalid || !this.loginFormHasBeenSubmitted) {
      this.loginFormHasBeenSubmitted = true;
      this.authService
        .login(this.getLoginFormData())
        .pipe(first())
        .subscribe(
          (data) => {
            console.log("=========>",data)
            location.reload();
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
    }
  }
}
