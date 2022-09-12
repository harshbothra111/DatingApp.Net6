import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const localUser = localStorage.getItem("user");
    if (localUser != null) {
      const user: User = JSON.parse(localUser);
      this.accountService.setCurrentUser(user);
    }
  }
}
