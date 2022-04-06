import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination } from "swiper";

SwiperCore.use([Autoplay]);

@Component({
	selector: 'app-characters-slider',
	templateUrl: './characters-slider.component.html',
	styleUrls: ['./characters-slider.component.scss']
})
export class CharactersSliderComponent implements OnInit {
	public characters: Character[] = [];
	public selectedChar: Character | undefined;
	public imgApi: string = environment.imgApi;

	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private tagService: TagsService,
		private router: Router
	) { }
	ngOnInit(): void {
		this.characterService.getCharacters().then(res => {
			this.characters = res;

			for (let index = 0; index < this.characters.length; index++) {
				const element = this.characters[index];
				if (element.id) {
					this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [12] }).then(data => {
						let _charMedia: Media[] = data;
						if (_charMedia && _charMedia?.length > 0) {
							for (let i = 0; i < _charMedia.length; i++) {
								const mediaElement = _charMedia[i];
								if (mediaElement.id)
									element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
							}
						} else {
							this.characters = this.characters.filter(CH => CH.id != element.id)
						}
					})
				}
			}
		});
	}

	navigate(char: Character) {
		this.router.navigate([`./characters/profile`, char.id]);
		window.scrollTo({ behavior: 'smooth', top: 0 });
		// setTimeout(() => {
		//   window.scroll(0,0)
		//   window.location.reload()
		// }, 1);
	}
	isMobile(): boolean {
		if (window.innerWidth <= 426) {
			return true
		}
		return false
	}

}
