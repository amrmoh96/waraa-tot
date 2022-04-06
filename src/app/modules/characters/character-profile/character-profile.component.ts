import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/Character.model';
import { Media } from 'src/app/models/Media.model';
import { CharacterMediaService } from 'src/app/services/character-media.service';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
@Component({
	selector: 'app-character-profile',
	templateUrl: './character-profile.component.html',
	styleUrls: ['./character-profile.component.scss']
})
export class CharacterProfileComponent implements OnInit {
	public character: Character | undefined = {};
	public charImages: Media[] = [];
	public charVideos: Media[] = [];
	public imgApi: string = environment.imgApi;
	public profileImage?: string = '';
	public coverImage?: string = '';
	loadSize: number = 6;
	vidSize: number = 6;
	public showImages: boolean = false;
	public initialSlide:number=0;
	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private CHME: CharacterMediaService,
		private tagService: TagsService,
		private activeRoute: ActivatedRoute,
		private utilityService: UtilityService
	) {
		this.resetLoadSize()
		window.scroll(0, 0)
	}

	ngOnInit(): void {
		this.activeRoute.params.subscribe((P) => {
			this.character = {}
			this.profileImage = '';
			this.coverImage = ''
			this.characterService.getCharacterById(Number(P.id)).then((res) => {
				this.character = res;
			});
			this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(P.id), 'TagIds': [4] }).then(res => {
				this.profileImage = `${this.imgApi}/Media/GetMedia?id=${res[0]?.id}`;
			})
			this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(P.id), 'TagIds': [5] }).then(res => {
				if (res && res[0] && res[0].id) {
					this.coverImage = `${this.imgApi}/Media/GetMedia?id=${res[0]?.id}`;
				}
			})
			this.mediaService.GetByCharacterAndTags({ 'CharacterID': Number(P.id), 'TagIds': [7, 8, 9] }).then(res => {
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
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.resetLoadSize()
	}
	resetLoadSize() {
		if (this.isMobile()) {
			this.loadSize = this.vidSize = 3;
		}
	}
	isMobile(): boolean {
		if (window.innerWidth <= 991) {
			return true
		}
		return false
	}
	LoadMore() {
		this.loadSize += 3;
	}
	LoadMoreVid() {
		this.vidSize += 3;
	}
	openImageCarousel(i: number): void {
		this.initialSlide = i
		this.showImages = true
		this.utilityService.bodyUnscrollable();
	}
	hideImages() {
		this.showImages = false;
		this.utilityService.bodyScrollable();
	}
}
