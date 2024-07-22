import { Routes } from '@angular/router';
import { authGuard} from '../app/auth.guard'

export const routes: Routes = [
    {path: "", loadComponent: () => import("./components/login/login.component").then((i) => i.LoginComponent)},
    {path: "main", loadComponent: () => import("./components/main-page/main-page.component").then((i) => i.MainPageComponent), canActivate: [authGuard]},
    {path: "registration", loadComponent: () => import("./components/registration/registration.component").then((i) => i.RegistrationComponent)}
];
