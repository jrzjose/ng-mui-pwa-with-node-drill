import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBookComponent } from '../add-new-book/add-new-book.component';
import { App } from '../../app';
import { MemberListComponent } from '../member-list/member-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', component: DashboardComponent,
    children: [
      { path: 'new-book', component: AddNewBookComponent },
      { path: 'members', component: MemberListComponent },
      { path: '', redirectTo: 'members', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
