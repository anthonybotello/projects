import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
editForm;
errors;
restaurant;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe((params:Params) => {
      this.httpService.getOneRes(params.id)
        .subscribe((rest:any) =>  {
          if(rest === null){
            this.router.navigate(['/'])
          }
          this.editForm = this.formBuilder.group({
            name: new FormControl(rest.name,[
              Validators.required,
              Validators.minLength(3)
            ]),
            cuisine: new FormControl(rest.cuisine,[
              Validators.required,
              Validators.minLength(3)
            ])
          });
          this.restaurant = rest;
        });
      });
   }

  ngOnInit() {
  }

  onSubmit(editForm){
    this.httpService.updateRes(editForm,this.restaurant._id)
      .subscribe((msg:any) => {
        if(msg.success){
          this.router.navigate(['/restaurants']);
        }
        else{
          this.errors = msg;
        }
      });
  }

  get name() { return this.editForm.get('name'); }
  get cuisine() { return this.editForm.get('cuisine'); }
}