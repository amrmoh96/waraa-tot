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
	) {}

	ngOnInit(): void {
		this.activeRoute.params.subscribe((P) => {
			this.characterService.getCharacterById(Number(P.id)).then((res) => {
				this.character = res;
			});
			this.mediaService.getMediaByCharacterId(Number(P.id)).then((res) => {
				for (let index = 0; index < res.length; index++) {
					const element = res[index];
					this.tagService.getTagsByMediaId(Number(element.id)).then((data) => {
						element.tags = data;
						if(element.tags?.find(T => T.tag1 == 'main_image')){
							this.profileImage = `${this.imgApi}/uploads/media/${element.id}.png`;
						}
						if(element.tags?.find(T => T.tag1 == 'cover_image')){
							this.coverImage = `${this.imgApi}/uploads/media/${element.id}.png`;
						}
					});
				}
				this.charVideos = res.filter((M) => M.mediaType == 1);
				this.charImages = res.filter((M) => M.mediaType == 2);
			});
		});
	}
}
