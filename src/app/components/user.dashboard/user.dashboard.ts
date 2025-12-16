import { Component } from '@angular/core';
import { UserAddComponent } from './../user-add/user-add';
import { UserListComponent } from './../user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [UserAddComponent, UserListComponent],
  template: `
    <div>
      <h1>User Management</h1>
      <app-user-add />
      <app-user-list />
    </div>
  `,
})
export class AppComponent { }