import { Component } from '@angular/core';
import { UserAddComponent } from './../user-add/user-add';
import { UserListComponent } from './../user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [UserAddComponent, UserListComponent],
  templateUrl: './user.dashboard.html',
})
export class AppComponent { }