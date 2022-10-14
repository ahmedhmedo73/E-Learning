import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
// import { StatusService } from 'src/app/services/status.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  alert_message: string = '';
  alert_message_status: boolean = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  sign_in() {
    console.log('signed in!');
    console.log(this.loginForm);

    // SIGN IN
    // let sign_in_status = this.userS.sign_in(this.loginForm.value);
    let sign_in_status = '200';

    if (sign_in_status == '200') {
      this.router.navigate(['/home']);
    } else {
      // SHOW ALERT MESSAGE
      this.alert_message = sign_in_status;
      this.alert_message_status = true;

      setTimeout(() => {
        this.alert_message_status = false;
      }, 2000);

      // RESET FORM
      this.loginForm.reset();
    }
  }
  login(loginform: FormGroup) {
    this._AuthService.login(loginform.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token', response.token);
        this._AuthService.saveCurrentUser();
        this._AuthService.isLogin = true;
        this.router.navigate(['/home']);
      } else {
        this.error = response.message;
      }
    });
  }
}
