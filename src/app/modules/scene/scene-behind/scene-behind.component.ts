import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from 'src/app/models/Media.model';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
@Component({
	selector: 'app-scene-behind',
	templateUrl: './scene-behind.component.html',
	styleUrls: ['./scene-behind.component.scss']
})
export class SceneBehindComponent implements OnInit {
	public mainScene: Media = {};
	public scenes: Media[] = [];
	public images: Media[] = [];
	public isVideoPlaying: boolean = false;
	loadSize: number = 6;
	vidSize: number = 6;
	public imgApi:string = environment.imgApi
	public showImages: boolean = false;
	public initialSlide:number=0;
	constructor(private media: MediaService, private tagsService: TagsService, private sanitizer: DomSanitizer, private utilityService: UtilityService) { }

	ngOnInit(): void {
		this.resetLoadSize()
		this.media.getMediaByTagIds([8]).then(res => {
			this.scenes = res.filter(M => M.mediaType == 1);
			this.images = res.filter(M => M.mediaType == 2);
			this.mainScene = this.scenes[0];
		})
	}

	iFrameSRC() {
		let _URL = `https://www.youtube.com/embed/${this.mainScene.youtubeId}`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(_URL);
	}

	playVideo() {
		this.isVideoPlaying = true;
		this.utilityService.bodyUnscrollable();
	}
	closeVideo() {
		this.isVideoPlaying = false;
		this.utilityService.bodyScrollable();
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
