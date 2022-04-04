import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help/help.component';
import { SharedModule } from '../shared/shared.module';
import { HelpArticleComponent } from './help-article/help-article.component';

@NgModule({
	declarations: [ HelpComponent, HelpArticleComponent ],
	imports: [ CommonModule, HelpRoutingModule, SharedModule ]
})
export class HelpModule {}
