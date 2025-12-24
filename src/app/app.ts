import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add';
import { UserListComponent } from './components/user-list/user-list'
import { RouterOutlet } from '@angular/router';
import {AuthService} from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('userManagerApp');
}
