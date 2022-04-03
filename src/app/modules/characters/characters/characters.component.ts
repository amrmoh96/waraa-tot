import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { EffectCoverflow, EffectFade, Swiper } from 'swiper';

SwiperCore.use([EffectCoverflow]);

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
	public characters: Character[] = [];
	public selectedChar: Character | undefined;
	public imgApi: string = environment.imgApi;
	public teachers: Character[] = [];
	public students: Character[] = [];
	public coverflowEffect = {
		rotate: 0,
		stretch: 0,
		depth: 500,
		modifier: this.isMobile() ? 3 : 1,
		slideShadows: false
	}

	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private tagService: TagsService
	) { }

	ngOnInit(): void {
		this.characterService.getCharacters().then(res => {
			this.characters = res;
			for (let index = 0; index < this.characters.length; index++) {
				const element = this.characters[index];
				element.order = index + 1;
				if (element.id) {
					this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [12] }).then(data => {
						let _charMedia: Media[] = data;
						for (let i = 0; i < _charMedia.length; i++) {
							const mediaElement = _charMedia[i];
							if (mediaElement.id) {
								element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
								element.mediaID = mediaElement.id
								this.teachers.push(element)
								this.teachers = this.sortArray(this.teachers)
							}
						}
					})
				}
			}
		});
	}

	selectCharacter(char: Character) {
		this.selectedChar = {}
		this.selectedChar = char;
	}

	sortArray(arr: Character[]): Character[] {
		let _sortedArr: Character[] = [];
		let _fisrt: Character = arr?.find(C => C.firstname == 'Marwan') || {}
		let _second: Character = arr?.find(C => C.firstname == 'Dalilah') || {}
		if (_fisrt.firstname) {
			_sortedArr.push(_fisrt)
		}
		if (_second.firstname) {
			_sortedArr.push(_second)
		}
		_sortedArr = _sortedArr.concat(arr?.filter(C => C.firstname != 'Marwan' && C.firstname != 'Dalilah') || [])
		return _sortedArr
	}
	onSwiper([swiper]: any) {
		// console.log(swiper);
	}
	onSlideChange() {
		// console.log('slide change');
	}
	isMobile(): boolean {
		if (window.innerWidth <= 426) {
			return true
		}
		return false
	}
}
