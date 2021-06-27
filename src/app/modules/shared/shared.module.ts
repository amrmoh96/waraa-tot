import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SceneCardComponent } from './scene-components/scene-card/scene-card.component';
import { SceneCardWideComponent } from './scene-components/scene-card-wide/scene-card-wide.component';
import { ScenceCardSmallComponent } from './scene-components/scence-card-small/scence-card-small.component';
import { NewsCardHomeComponent } from './news-cards/news-card-home/news-card-home.component';
import { RouterModule } from '@angular/router';
import { CardImageComponent } from './scene-components/card-image/card-image.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		SceneCardComponent,
		SceneCardWideComponent,
		ScenceCardSmallComponent,
		NewsCardHomeComponent,
		CardImageComponent
	],
	imports: [ CommonModule, RouterModule ],
	exports: [
		HeaderComponent,
		FooterComponent,
		SceneCardComponent,
		SceneCardWideComponent,
		ScenceCardSmallComponent,
		NewsCardHomeComponent,
		CardImageComponent
	]
})
export class SharedModule {}
