import { Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add';
import { UserListComponent } from './components/user-list/user-list';
import { AppComponent } from './components/user.dashboard/user.dashboard';
import { LoginComponent } from './components/login.component/login.component';
import { RegisterComponent } from './components/register.component/register.component';
import { authGuard } from './guards/auth-guard'; 
import { publicGuard } from './guards/public-guard';

export const routes: Routes = [
  // Public routes — block if already logged in
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [publicGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [publicGuard]
  },

  // Protected dashboard
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'add', component: UserAddComponent },
      { path: 'list', component: UserListComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];