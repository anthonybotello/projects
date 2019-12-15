import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
reviewForm;
errors;
resid;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe((params:Params) => this.resid = params.id);
    this.reviewForm = this.formBuilder.group({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      stars: new FormControl(null,[
        Validators.required
      ]),
      content: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  ngOnInit() {
  }

  onSubmit(reviewForm){
    this.httpService.createReview(reviewForm,this.resid)
      .subscribe((msg:any) => {
        if(msg.success){
          this.router.navigate(['/restaurants/'+this.resid]);
        }
        else{
          this.errors = msg;
        }
      });
  }

  get name() { return this.reviewForm.get('name'); }
  get stars() { return this.reviewForm.get('stars'); }
  get content() { return this.reviewForm.get('content'); }

}
 