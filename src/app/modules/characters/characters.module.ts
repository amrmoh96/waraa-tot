import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterProfileComponent } from './character-profile/character-profile.component';
import { CharactersSliderComponent } from './characters-slider/characters-slider.component';


@NgModule({
  declarations: [
    CharactersComponent,
    CharacterProfileComponent,
    CharactersSliderComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule
  ]
})
export class CharactersModule { }
