import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { CharacterMediaService } from 'src/app/services/character-media.service';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-character-profile',
	templateUrl: './character-profile.component.html',
	styleUrls: [ './character-profile.component.scss' ]
})
export class CharacterProfileComponent implements OnInit {
	public character: Character | undefined = {};
	public charImages: Media[] = [];
	public charVideos: Media[] = [];
	public imgApi: string = environment.imgApi;
	public profileImage?: string = '';
	public coverImage?: string = '';
	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private CHME: CharacterMediaService,
		private tagService: TagsService,
		private activeRoute: ActivatedRoute
	) {
		window.scroll(0,0)
	}

	ngOnInit(): void {
		this.activeRoute.params.subscribe((P) => {
			this.character = {}
			this.profileImage = '';
			this.coverImage = ''
			this.characterService.getCharacterById(Number(P.id)).then((res) => {
				this.character = res;
			});
			this.mediaService.GetByCharacterAndTags({'CharacterID':Number(P.id),'TagIds':[4]}).then(res => {
				this.profileImage = `${this.imgApi}/Media/GetMedia?id=${res[0]?.id}`;
			})
			this.mediaService.GetByCharacterAndTags({'CharacterID':Number(P.id),'TagIds':[5]}).then(res => {
				this.coverImage = `${this.imgApi}/Media/GetMedia?id=${res[0]?.id}`;
			})
			this.mediaService.GetByCharacterAndTags({'CharacterID':Number(P.id),'TagIds':[7,9]}).then(res => {
				this.charImages = res.filter((M) => M.mediaType == 2);
				this.charVideos = res.filter((M) => M.mediaType == 1);
			})
			// this.mediaService.GetByCharacterAndTags({'CharacterID':Number(P.id),'TagIds':[4,5,7,9]}).then(res => {
			// 	console.log(res);
			// 	for (let index = 0; index < res.length; index++) {
			// 		const element = res[index];
			// 		this.tagService.getTagsByMediaId(Number(element.id)).then((data) => {
			// 			element.tags = data;
			// 			if(element.tags?.find(T => T.tag1 == 'main_image')){
			// 				this.profileImage = `${this.imgApi}/Media/GetMedia?id=${element.id}`;
			// 			}
			// 			if(element.tags?.find(T => T.tag1 == 'cover_image')){
			// 				this.coverImage = `${this.imgApi}/Media/GetMedia?id=${element.id}`;
			// 			}
			// 			if(element.tags?.find(T => T.tag1 == 'scene_image') && element.mediaType == 2){
			// 				this.charImages.push(element);
			// 			}
			// 		});
			// 	}
			// 	this.charVideos = res.filter((M) => M.mediaType == 1);
				
			// })
			// this.mediaService.getMediaByCharacterId(Number(P.id)).then((res) => {
			// 	for (let index = 0; index < res.length; index++) {
			// 		const element = res[index];
			// 		this.tagService.getTagsByMediaId(Number(element.id)).then((data) => {
			// 			element.tags = data;
			// 			if(element.tags?.find(T => T.tag1 == 'main_image')){
			// 				this.profileImage = `${this.imgApi}/Media/GetMedia?id=${element.id}`;
			// 			}
			// 			if(element.tags?.find(T => T.tag1 == 'cover_image')){
			// 				this.coverImage = `${this.imgApi}/Media/GetMedia?id=${element.id}`;
			// 			}
			// 			if(element.tags?.find(T => T.tag1 == 'scene_image') && element.mediaType == 2){
			// 				this.charImages.push(element);
			// 			}
			// 		});
			// 	}
			// 	this.charVideos = res.filter((M) => M.mediaType == 1);
			// });
		});
	}
}
