import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BusinessComponent } from './business/business.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {component: LoginComponent,
        path:'login'
    },
    {
        component : BusinessComponent,
        path: 'business'
    },
    {
        component: CartComponent,
        path:'cart'
    }
];
