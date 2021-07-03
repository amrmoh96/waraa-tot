import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [ 
  { path: '', component: NewsComponent }, 
  { path: ':id', component: NewsPageComponent } 
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class NewsRoutingModule {}
