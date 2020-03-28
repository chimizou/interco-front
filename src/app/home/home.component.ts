import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  HOST : String = "http://localhost:8080/"
  title = 'Demo';
  greeting : any = {id: '', content: ''};

  constructor(private appService: AppService, private http: HttpClient) {
    http.get(this.HOST + 'resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.appService.authenticated; }

}
