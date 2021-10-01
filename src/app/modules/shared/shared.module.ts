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
import { HelpFormComponent } from './help-form/help-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		SceneCardComponent,
		SceneCardWideComponent,
		ScenceCardSmallComponent,
		NewsCardHomeComponent,
		CardImageComponent,
		HelpFormComponent
	],
	imports: [ CommonModule, RouterModule, FormsModule ],
	exports: [
		HeaderComponent,
		FooterComponent,
		SceneCardComponent,
		SceneCardWideComponent,
		ScenceCardSmallComponent,
		NewsCardHomeComponent,
		CardImageComponent,
		HelpFormComponent
	]
})
export class SharedModule {}
