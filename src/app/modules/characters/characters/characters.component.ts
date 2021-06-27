import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: [ './characters.component.scss' ]
})
export class CharactersComponent implements OnInit {
	public characters: Character[] = [];
	public selectedChar: Character|undefined;
	public imgApi:string = environment.imgApi;

	constructor(
		private characterService:CharacterService,
		private mediaService:MediaService,
		private tagService:TagsService
	) {}

	ngOnInit(): void {
		this.characterService.getCharacters().then(res => {
			this.characters = res;
			for (let index = 0; index < this.characters.length; index++) {
				const element = this.characters[index];
				if(element.id){
					this.mediaService.getMediaByCharacterId(element.id).then(data => {
						let _charMedia:Media[] = data;
						for (let i = 0; i < _charMedia.length; i++) {
							const mediaElement = _charMedia[i];
							if(mediaElement.id){
								this.tagService.getTagsByMediaId(mediaElement.id).then(tags => {
									let main_img :Tag|undefined = tags?.find(T => T.tag1 == 'main_image');
									if(main_img){
										element.profileURL = `${this.imgApi}/uploads/media/${mediaElement.id}.png`
									}
								})
							}
						}
					})
				}
			}
		});
	}
	selectCharacter(char: Character) {
		this.selectedChar = char;
		console.log(this.selectedChar);
	}
}
