import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-characters-slider',
  templateUrl: './characters-slider.component.html',
  styleUrls: ['./characters-slider.component.scss']
})
export class CharactersSliderComponent implements OnInit {
  public characters: Character[] = [];
	public selectedChar: Character|undefined;
	public imgApi:string = environment.imgApi;

	constructor(
		private characterService:CharacterService,
		private mediaService:MediaService,
		private tagService:TagsService,
    private router:Router
	) {}
  ngOnInit(): void {
    this.characterService.getCharacters().then(res => {
			this.characters = res;
      
			for (let index = 0; index < this.characters.length; index++) {
				const element = this.characters[index];
				if(element.id){
					this.mediaService.GetByCharacterAndTags({'CharacterID':Number(element.id),'TagIds':[10,11]}).then(data => {
						let _charMedia:Media[] = data;
						for (let i = 0; i < _charMedia.length; i++) {
							const mediaElement = _charMedia[i];
							element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
							// if(mediaElement.id){
							// 	this.tagService.getTagsByMediaId(mediaElement.id).then(tags => {
							// 		let main_img :Tag|undefined = tags?.find(T => T.tag1 == 'main_image');
							// 		if(main_img){
							// 		}
							// 	})
							// }
						}
					})
				}
			}
		});
  }

  navigate(char:Character){
    this.router.navigate([`./characters/profile`, char.id]);
	window.scrollTo({behavior:'smooth', top:0});
    // setTimeout(() => {
    //   window.scroll(0,0)
    //   window.location.reload()
    // }, 1);
  }

}
