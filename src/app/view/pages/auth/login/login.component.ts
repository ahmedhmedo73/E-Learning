import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { StatusService } from 'src/app/services/status.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // VARIABLES
  sign_in_form!: FormGroup;
  alert_message: string = '';
  alert_message_status: boolean = false;

  // FUNCTIONS
  constructor(
    // private statusS: StatusService,
    private fb: FormBuilder,
    // private userS: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // SET HEADER AND FOOTER DISPLAY
    // this.statusS.set_header_footer_status(false);

    // CONFIGURE THE FORM
    this.sign_in_form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // AUTO-LOGGING WHEN SIGNED IN
    // if (this.userS.get_signed_in()) {
    //   this.router.navigate(['/home']);
    // }
  }

  sign_in() {
    console.log('signed in!');
    console.log(this.sign_in_form);

    // SIGN IN
    // let sign_in_status = this.userS.sign_in(this.sign_in_form.value);
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
      this.sign_in_form.reset();
    }
  }
}
