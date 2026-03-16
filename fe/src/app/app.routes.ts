import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { Goals } from './components/goals/goals';

export const routes: Routes = [
    {
        path : '',
        component: HomePage,
    },
    {
        path: 'goals',
        component: Goals
    }
];
