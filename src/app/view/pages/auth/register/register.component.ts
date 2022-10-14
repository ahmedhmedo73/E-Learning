import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
// import { User } from 'src/app/models/user';
// import { StatusService } from 'src/app/services/status.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // VARIABLES
  registerForm!: FormGroup;
  alert_message: boolean = false;
  error: any;
  password: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required]],
          confirm_password: ['', [Validators.required]],
        },
        { validator: this.passwordConfirming }
      ),
    });
  }
  passwordConfirming(c: AbstractControl): ValidationErrors | null {
    if (c.get('password')?.value !== c.get('confirm_password')?.value) {
      return { invalid: false };
    }
    return null;
  }
  register(registerForm: FormGroup) {
    
    console.log(registerForm);
    this._AuthService.register(registerForm.value).subscribe((response) => {
      if (response.message == 'success') {
        this._Router.navigate(['/login']);
      } else {
        this.error = response.errors.email.message;
      }
    });
  }

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return { samePass: true };
    }
    return null;
  }
}
