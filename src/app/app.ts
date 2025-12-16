import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add';
import { UserListComponent } from './components/user-list/user-list'

@Component({
  selector: 'app-root',
  imports: [ UserAddComponent, UserListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('userManagerApp');
}
