import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllRes(){
    return this.http.get('/rests');
  }
  getOneRes(id:string){
    return this.http.get(`/rests/${id}`);
  }
  createRes(formData){
    return this.http.post('/rests',formData);
  }
  updateRes(formData,id:string){
    return this.http.put(`/rests/${id}`,formData);
  }
  deleteRes(id:string){
    this.http.delete(`/rests/${id}`).subscribe();
  }
  createReview(formData,id:string){
    return this.http.post(`/rests/${id}/reviews`,formData);
  }
}
