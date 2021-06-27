import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { HomePageBannerComponent } from './home-page-banner/home-page-banner.component';

@NgModule({
	declarations: [ HomePageComponent, HomePageBannerComponent ],
	imports: [ CommonModule, HomeRoutingModule, SharedModule ]
})
export class HomeModule {}
