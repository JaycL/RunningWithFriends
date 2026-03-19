import { Routes } from '@angular/router';
import { LoginPage } from './users/pages/login/login.page.js';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component.js';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component.js';

import { EventsListPage } from './events/pages/events-list/events-list.page.js';

export const routes: Routes = [
    {   path: '', 
        component: MainLayoutComponent,
        children: [            
            {path: 'events-list', component: EventsListPage},
            
            
        ]
    },
    {   path: '', 
        component: AuthLayoutComponent,
        children: [
            {path: 'login', component: LoginPage}            
        ]
    },
];
