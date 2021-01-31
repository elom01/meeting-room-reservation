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
import { MatSnackBar } from "@angular/material";

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
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
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
            console.log("=========>", data);
            location.reload();
            this.showSuccessSnackbar("Vous êtes connecté(e)", 5000);
          },
          (error) => {
            this.error = error;
            this.loading = false;
            this.showErrorSnackbar(
              "Une erreur s'est produite. Veuillez vérifier vos identifiants",
              5000
            );
          }
        );
    }
  }

  private showErrorSnackbar(
    message,
    duration,
    action = null,
    className = "red-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }

  private showSuccessSnackbar(
    message,
    duration,
    action = null,
    className = "green-snackbar"
  ) {
    this.matSnackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
