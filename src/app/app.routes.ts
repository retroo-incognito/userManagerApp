import { Routes } from '@angular/router';
import { UserAddComponent } from './components/user-add/user-add'
import { UserListComponent } from "./components/user-list/user-list";
import { AppComponent } from "./components/user.dashboard/user.dashboard";

export const routes: Routes = [
    { path: '', component:AppComponent},
    {path: '', component:UserAddComponent},
    { path: 'list', component:UserListComponent}
];
