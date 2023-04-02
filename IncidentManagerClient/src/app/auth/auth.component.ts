import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';

@Component({
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  public username: string = 'maxwel';
  public password: string = '123456';
  public errorMessage: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  goBack() {
    this.router.navigateByUrl('/');
  }

  authenticate(form: NgForm) {
    console.log('form submit');
    if (form.valid) {
      this.auth
        .authenticate(this.username, this.password)
        .subscribe((response) => {
          if (response) {
            this.router.navigateByUrl('/incidents');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
