import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subject } from "rxjs";
import { AuthentificationService } from "../authentification.service";
import { User } from "../models/user.model";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  private _snackBar: any;
  public formRegister: FormGroup;
  public registerFormHasBeenSubmitted: boolean = false;
  public dataUser: User;
  public isEditForm: boolean;
  public isLoading = new Subject<boolean>();

  constructor(
    private authService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formRegister = new FormGroup({
      familyname: new FormControl(),
      firstname: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      password: new FormControl(),
      checkPassword: new FormControl(),
    });
    if (this.dataUser) {
      this.isEditForm = true;
      this.formRegister = this.formBuilder.group({
        familyname: [this.dataUser.familyname, [Validators.required]],
        firstname: [this.dataUser.firstname, [Validators.required]],
        email: [this.dataUser.email, [Validators.required]],
        phoneNumber: [this.dataUser.phoneNumber, [Validators.required]],
        password: [this.dataUser.password, [Validators.required]],
      });
    } else {
    }
  }

  private getRegisterFormData() {
    var form = new FormData();
    form.append("familyname", this.formRegister.value.familyname);
    form.append("firstname", this.formRegister.value.firstname);
    form.append("email", this.formRegister.value.email);
    form.append("phoneNumber", this.formRegister.value.phoneNumber);
    form.append("password", this.formRegister.value.password);
    return form;
  }

  public onRegister() {
    this.registerFormHasBeenSubmitted = true;

    if (!this.formRegister.invalid) {
      this.authService
        .register(this.getRegisterFormData())
        .subscribe((user) => {
          this.openSnackBar("");
        });
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, {
      duration: 2000,
    });
  }
}
