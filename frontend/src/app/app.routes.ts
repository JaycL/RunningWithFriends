import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component.js';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component.js';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component.js';
import { PageEventsComponent } from './pages/page-events/page-events.component.js';

export const routes: Routes = [
    {   path: '', 
        component: MainLayoutComponent,
        children: [            
            {path: 'events', component: PageEventsComponent},
            
        ]
    },
    {   path: '', 
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginPageComponent}            
        ]
    },
];
