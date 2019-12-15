import { Component, OnInit } from '@angular/core';
import {FormBuilder, Form} from '@angular/forms';
import {HttpService} from '../http.service';
import {ActivatedRoute,Router,Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
editForm;
errors;
productID;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.route.params.subscribe((params:Params) => {
        this.productID = params.id;
        this.httpService.getOne(params.id).subscribe((product:any) => {
          console.log(product);
          this.editForm = this.formBuilder.group({
            name:product.name,
            price:product.price,
            image:product.image
          });
        });
      });
  }

  ngOnInit() {
  }

  onSubmit(formData){
    this.httpService.update(formData,this.productID)
      .subscribe((msg:any) => {
        if(msg.success){
          this.router.navigate(['/products'])
        }
        else{
          this.errors = msg;
        }
      })
  }
}
