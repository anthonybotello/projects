import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
restaurants;
  constructor(private httpService: HttpService, private router: Router) {
  }

  getAll(){
    this.httpService.getAllRes()
      .subscribe(ress => this.restaurants = ress);
  }

  ngOnInit() {
    this.router.events
      .subscribe((event: NavigationEnd)=> {
        if(event instanceof NavigationEnd){
          this.getAll();
        }
      })
    this.getAll();
  }

  deleteRes(id:string){
    this.httpService.deleteRes(id);
    this.httpService.getAllRes()
      .subscribe(ress => this.restaurants = ress);
  }
  overThirty(createdAt:string){
    var now = Date.now();
    var diff = now - Date.parse(createdAt);
    if(diff > 30000){
      return true;
    }
    else{
      return false
    }
  }
}
