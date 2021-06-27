import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterProfileComponent } from './character-profile/character-profile.component';
import { CharactersComponent } from './characters/characters.component';

const routes: Routes = [
	{
		path: '',
		component: CharactersComponent
	},
	{
		path: 'profile/:id',
		component: CharacterProfileComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CharactersRoutingModule {}
