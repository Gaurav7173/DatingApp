import { Component, inject,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http=inject(HttpClient);
  private accountService= inject(AccountService)
  title = 'Dating app new ..';
  users:any;

  ngOnInit(): void {

    this.getUser();
    this.setCurrentUser();
    
  }  

  setCurrentUser(){
    const stringUser=localStorage.getItem('user');
    if(!stringUser) return;
    const user=JSON.parse(stringUser);
    this.accountService.currentUser.set(user);
    
  }

  getUser()
  {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next:response => this.users=response,
      error:error=>console.log(error),
      complete:()=>console.log('Request has completed')  
    })
  }
}
