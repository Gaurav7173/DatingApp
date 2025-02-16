import { Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './_guards/auth.guard';
import { TestsErrorsComponent } from './errors/tests-errors/tests-errors.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
            {path:'members',component:MemberListComponent},
            {path:'members/:id',component:MemberDetailsComponent},
            {path:'lists',component:ListsComponent},
            {path:'messages',component:MessagesComponent},
        ]
    },
    {path:'errors',component:TestsErrorsComponent},
    {path:'**',component:HomeComponent,pathMatch:'full'},
    

];
