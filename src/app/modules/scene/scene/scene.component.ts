import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from 'src/app/models/Media.model';
import { MediaService } from 'src/app/services/media.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: [ './scene.component.scss' ]
})
export class SceneComponent implements OnInit {
	public mainScene: Media = {};
	public scenes: Media[] = [];
	public isVideoPlaying: boolean = false;
	constructor(private media: MediaService, private sanitizer: DomSanitizer, private utilityService: UtilityService) {}

	ngOnInit(): void {
		this.media.getMediaByTagIds([7]).then((res) => {
			// res = res.filter((M) => M.mediaType == 2);
			this.scenes = res.slice(1);
			this.mainScene = res[0];
		});
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
}
