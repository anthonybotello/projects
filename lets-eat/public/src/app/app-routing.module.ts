import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  {path: 'restaurants', component: HomeComponent, children: [
    {path:'new', component: NewComponent},
    {path:':id/edit', pathMatch:'full', component: EditComponent}
  ]},
  {path: 'restaurants/:id', component: RestaurantComponent, children: [
    {path: 'review', pathMatch: 'full', component: ReviewComponent},
  ]},
    {path:'', pathMatch: 'full', redirectTo: '/restaurants'},
    {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
