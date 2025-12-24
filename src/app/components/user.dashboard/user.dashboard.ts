import { Component } from '@angular/core';
import { UserAddComponent } from './../user-add/user-add';
import { UserListComponent } from './../user-list/user-list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserAddComponent, UserListComponent,],
  templateUrl: './user.dashboard.html',
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}