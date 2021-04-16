import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ChoosedComponent } from './choosed/choosed.component';
import { ResultSearchComponent } from './result-search/result-search.component';


const routes: Routes = ([
  { path: '', component: CarouselComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: 'choosed', component: ChoosedComponent },
  { path: 'result', component: ResultSearchComponent }
]);

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
