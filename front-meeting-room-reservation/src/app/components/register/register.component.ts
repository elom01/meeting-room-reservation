import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Subject } from "rxjs";
import { AuthentificationService } from "../../services/authentification.service";
import { User } from "../../models/user.model";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;
  public registerFormHasBeenSubmitted: boolean = false;
  public dataUser: User;
  public isEditForm: boolean;
  public isLoading = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      familyname: ["", Validators.required],
      firstname: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required],
      checkPassword: ["", Validators.required],
    });
  }

  private getRegisterFormData() {
    let newUser: User = {
      familyname: this.formRegister.value.familyname,
      firstname: this.formRegister.value.firstname,
      email: this.formRegister.value.email,
      phoneNumber: this.formRegister.value.phoneNumber,
      password: this.formRegister.value.password,
    };
    return newUser;
  }

  get registerLoginControle() {
    return this.formRegister.controls;
  }

  public onRegister() {
    if (this.formRegister.invalid || this.registerFormHasBeenSubmitted) {
      this.showSnackbar("Veulliez verifier les champs renseignés", null, 5000);
      return;
    }
    if (
      this.formRegister.value.password != this.formRegister.value.checkPassword
    ) {
      this.showSnackbar(
        "Veulliez vérifier votre mot de passe en saisissant le même précédement renseigné",
        null,
        5000
      );
      return;
    }
    if (!this.formRegister.invalid || !this.registerFormHasBeenSubmitted) {
      this.registerFormHasBeenSubmitted = true;
      this.authService
        .register(this.getRegisterFormData())
        .subscribe((user) => {
          this.showSnackbar("Votre inscription est validée", null, 5000);
          this.registerFormHasBeenSubmitted = false;
        });
    }
  }
  private showSnackbar(message, action, duration, className = "red-snackbar") {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: [className],
    });
  }
}
