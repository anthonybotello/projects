import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

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
    private httpService: HttpService,
    private router: Router
    ) {
      this.newForm = this.formBuilder.group({
        name:'',
        price:'',
        image:'',
      })
    }

  ngOnInit() {
  }

  onSubmit(formData){
    this.httpService.create(formData)
      .subscribe((msg:any) => {
        if(msg.success){
          this.router.navigate(['/products']);
        }
        else{
          this.errors = msg;
        }
      });
  }

}
