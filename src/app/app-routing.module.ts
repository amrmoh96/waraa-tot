import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
	},
	{
		path: 'characters',
		loadChildren: () => import('./modules/characters/characters.module').then((m) => m.CharactersModule)
	},
	{
		path: 'scene',
		loadChildren: () => import('./modules/scene/scene.module').then((m) => m.SceneModule)
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
