import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from '../../_guards/auth.guard';
import { HomeComponent } from '../../home/home.component';
import { ListsComponent } from '../../lists/lists.component';
import { MemberDetailsComponent } from '../../members/member-details/member-details.component';
import { MemberListComponent } from '../../members/member-list/member-list.component';
import { MessagesComponent } from '../../messages/messages.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ServerErrorComponent } from '../server-error/server-error.component';

@Component({
  selector: 'app-tests-errors',
  imports: [],
  templateUrl: './tests-errors.component.html',
  styleUrl: './tests-errors.component.css'
})
export class TestsErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private http=inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
      
    })
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
      
    })
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
      
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
      
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register',{}).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error)
        this.validationErrors = error;
      }
      
    })
  }

}
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:id', component: MemberDetailsComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: 'errors', component: TestsErrorsComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];

