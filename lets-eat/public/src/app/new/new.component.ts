import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
newForm;
errors;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { 
    this.newForm = this.formBuilder.group({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      cuisine: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit() {
  }

  onSubmit(newForm){
    this.httpService.createRes(newForm)
      .subscribe((msg:any) => {
        if(msg.success){
          this.router.navigate(['/restaurants']);
        }
        else{
          this.errors = msg;
        }
      });
  }
  
  get name() { return this.newForm.get('name'); }
  get cuisine() { return this.newForm.get('cuisine'); }
}
