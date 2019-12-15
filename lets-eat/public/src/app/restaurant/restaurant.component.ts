import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
restaurant;
constructor(
  private router: Router,
  private httpService: HttpService,
  private route: ActivatedRoute
) { 
    this.getRes();
 }

  ngOnInit() {
    this.router.events
      .subscribe((event: NavigationEnd)=> {
        if(event instanceof NavigationEnd){
          this.getRes();
        }
      })
    this.getRes();
  }

  getRes(){
    this.route.params.subscribe((params:Params) => {
      this.httpService.getOneRes(params.id)
        .subscribe((rest:any) =>  {
          if(rest === null){
            this.router.navigate(['/'])
          }
          this.restaurant = rest;
        });
      });
  }

}