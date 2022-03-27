import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from 'src/app/models/Media.model';
import { MediaService } from 'src/app/services/media.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {
	public mainScene: Media = {};
	public scenes: Media[] = [];
	public Videos: Media[] = [];
	public isVideoPlaying: boolean = false;
	loadSize: number = 6;
	vidSize: number = 6;
	constructor(private media: MediaService, private sanitizer: DomSanitizer, private utilityService: UtilityService) { }

	ngOnInit(): void {
		this.resetLoadSize()
		this.media.getMediaByTagIds([9]).then((res) => {
			console.log(res);
			this.mainScene = res[0];
			this.Videos = res
		});
		this.media.getMediaByTagIds([7]).then((res) => {
			// res = res.filter((M) => M.mediaType == 2);
			this.scenes = res.slice(1);
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
	LoadMore() {
		this.loadSize += 3;
	}
	LoadMoreVid() {
		this.vidSize += 3;
	}
}
