import { Character } from './../../../models/Character.model';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home-page-banner',
	templateUrl: './home-page-banner.component.html',
	styleUrls: [ './home-page-banner.component.scss' ]
})
export class HomePageBannerComponent implements OnInit {
	public characters: Character[] = [];
	public activeSlide:number = 0;
	public imgApi:string = environment.imgApi;
	public translate:number = 0;
	public style = {'transform': 'translateX(0)' }
	public interval:any;
	constructor(
		private characterService:CharacterService,
		private mediaService:MediaService,
		private tagService:TagsService,
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
										element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
									}
								})
							}
						}
					})
				}
			}
		});
	}

	scrollToNews($event: Event) {
		$event.preventDefault();
		document.getElementById('homepage__latest__news')?.scrollIntoView({behavior:"smooth", block:'nearest'})
	}

	slide(slide:number = 1){
		this.translate = -1*slide*29.33;
		this.activeSlide = slide;
		this.style = {'transform': `translateX(${this.translate}rem)` }
		console.log(this.style);
		
	}

	ngAfterViewInit(){
		this.interval = setInterval(() => {
			if(this.activeSlide == this.characters?.length-1){
				this.slide(0)
			}else{
				this.slide(this.activeSlide+1);
			}
		}, 3000)
	}

	ngOnDestroy(){
		clearInterval(this.interval)
	}
}
