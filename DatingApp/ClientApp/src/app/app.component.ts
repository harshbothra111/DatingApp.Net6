import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.baseUrl += 'api/';
  }
  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.http.get(this.baseUrl + "users").subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }
}
