import { HelpComponent } from './help/help.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpArticleComponent } from './help-article/help-article.component';

const routes: Routes = [ 
	{ path: '', component:HelpComponent },
	{ path: ':id', component:HelpArticleComponent },
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class HelpRoutingModule {}
