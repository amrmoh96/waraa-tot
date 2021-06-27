import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterProfileComponent } from './character-profile/character-profile.component';


@NgModule({
  declarations: [
    CharactersComponent,
    CharacterProfileComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule
  ]
})
export class CharactersModule { }
