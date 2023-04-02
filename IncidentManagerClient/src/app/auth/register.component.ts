import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';

@Component({
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  public displayName: string = '';
  public password: string = '';
  public email: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  register(form: NgForm) {
    if (form.valid) {
      this.auth
        .signup(this.displayName, this.email, this.password)
        .subscribe((response) => {
          if (response) {
            this.router.navigateByUrl('/incidents');
          }
          this.errorMessage = 'User Registration Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
