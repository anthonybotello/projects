import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  create(formData){
    return this.http.post('/products/create',formData);
  }
  getAll(){
    return this.http.get('/products/get');
  }
  getOne(id:string){
    return this.http.get(`/products/get/${id}`);
  }
  update(formData,id:string){
    return this.http.put(`/products/update/${id}`,formData);
  }
  delete(id:string){
    this.http.delete(`/products/delete/${id}`)
      .subscribe();
  }
}
