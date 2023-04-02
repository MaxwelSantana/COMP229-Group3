import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}

  get authenticated() {
    return this.auth.authenticated;
  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/');
  }
}
