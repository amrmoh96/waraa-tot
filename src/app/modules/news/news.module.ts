import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news/news.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ NewsComponent, NewsPageComponent ],
	imports: [ CommonModule, NewsRoutingModule, SharedModule ]
})
export class NewsModule {}