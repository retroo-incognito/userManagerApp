import { Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add';
import { UserListComponent } from './components/user-list/user-list';
import { AppComponent } from './components/user.dashboard/user.dashboard';
import { LoginComponent } from './components/login.component/login.component';
import { RegisterComponent } from './components/register.component/register.component';

export const routes: Routes = [
    // PUBLIC AUTH
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // DASHBOARD SHELL
    {
        path: '',
        component: AppComponent,
        children: [
            { path: '', component: UserAddComponent },
            { path: 'list', component: UserListComponent }
        ]
    },

    { path: '**', redirectTo: 'login' }
];
