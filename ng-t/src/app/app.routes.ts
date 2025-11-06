import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookDetail } from './book-list/book-detail/book-detail';
import { AboutComponent } from './about/about.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

export const routes: Routes = [
    {path:'', redirectTo:'books', pathMatch:'full'},
    {path:'books', component: BookList},
    {path:'books/:id', component: BookDetail},
    {path:'about', component: AboutComponent},
    {path:'sign-up', component: SignUpFormComponent},
    {
        path:'admin',
        loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule)
    }
];
