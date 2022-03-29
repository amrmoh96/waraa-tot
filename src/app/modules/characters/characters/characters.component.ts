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
					this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [10, 11] }).then(data => {
						let _charMedia: Media[] = data;
						for (let i = 0; i < _charMedia.length; i++) {
							const mediaElement = _charMedia[i];
							if (mediaElement.id) {
								element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
								this.teachers.push(element)
								this.teachers = this.sortArray(this.teachers)
								// this.tagService.getTagsByMediaId(mediaElement.id).then(tags => {
								// 	let main_img :Tag|undefined = tags?.find(T => T.tag1 == 'main_image');
								// 	if(main_img){
								// 		if(tags?.find(T => T.tag1 == 'teacher')){
								// 		}
								// 		if(tags?.find(T => T.tag1 == 'student')){
								// 			this.students.push(element)
								// 			this.students = this.sortArray(this.students)
								// 		}
								// 	}
								// })
							}
						}
					})
					this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(element.id), 'TagIds': [11] }).then(data => {
						let _charMedia: Media[] = data;
						for (let i = 0; i < _charMedia.length; i++) {
							const mediaElement = _charMedia[i];
							if (mediaElement.id) {
								element.profileURL = `${this.imgApi}/Media/GetMedia?id=${mediaElement.id}`
								this.students.push(element)
								this.students = this.sortArray(this.students)
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

	sortArray(arr: Character[]) {
		return arr.sort((a, b) => {
			return (a.id || 0) - (b?.id || 0)
		})
	}
	onSwiper([swiper]: any) {
		// console.log(swiper);
	}
	onSlideChange() {
		// console.log('slide change');
	}
	isMobile(): boolean {
		if (window.innerWidth <=426) {
			return true
		}
		return false
	}
}
