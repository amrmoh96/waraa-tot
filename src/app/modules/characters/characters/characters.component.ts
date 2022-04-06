import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';
import SwiperCore, { Autoplay, EffectCoverflow, EffectFade, Swiper, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// SwiperCore.use([Autoplay, EffectCoverflow]);
SwiperCore.use([EffectCoverflow]);

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
	@ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
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
		slideShadows: false,
		loop: true
	}

	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private tagService: TagsService
	) { }

	ngOnInit(): void {
		this.characterService.getCharacters().then(res => {
			this.characters = res;

			let request: any = [];
			for (let index = 0; index < this.characters.length; index++) {
				const element = this.characters[index];
				element.order = index + 1;
				if (element.id) {
					request.push(this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [12] }))
					// this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [12] }).then(data => {
					// 	let _charMedia: Media[] = data;
					// 	for (let i = 0; i < _charMedia.length; i++) {
					// 		const mediaElement = _charMedia[i];
					// 		if (mediaElement.id) {
					// 			element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
					// 			element.mediaID = mediaElement.id
					// 			this.teachers.push(element)
					// 			this.teachers = this.sortArray(this.teachers)
					// 		}
					// 	}
					// })
				}
			}
			forkJoin(request).subscribe((res: any[]) => {
				for (let index = 0; index < res.length; index++) {
					const element: any[] = res[index];
					for (let i = 0; i < element.length; i++) {
						const media = element[i];
						console.log(media);
						let char: Character | undefined = this.characters.find(CH => CH.firstname?.toLowerCase()?.includes(media?.title?.toLowerCase()))
						if (char) {
							char.profileURL = `${this.imgApi}/Media/GetMedia?id=${media.id}`
							char.mediaID = media.id
							this.teachers.push(char)
						}
					}
				}
				this.teachers = this.sortArray(this.teachers)
			})
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
		let _Third: Character = arr?.find(C => C.firstname == 'Bassem') || {}
		if (_Third.firstname) {
			_sortedArr.push(_Third)
		}
		if (_fisrt.firstname) {
			_sortedArr.push(_fisrt)
		}
		if (_second.firstname) {
			_sortedArr.push(_second)
		}
		_sortedArr = _sortedArr.concat(arr?.filter(C => C.firstname != 'Marwan' && C.firstname != 'Dalilah' && C.firstname != 'Bassem') || [])
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
