import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from 'src/app/models/Media.model';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-scene-card',
	templateUrl: './scene-card.component.html',
	styleUrls: [ './scene-card.component.scss' ]
})
export class SceneCardComponent implements OnInit {
	@Input() video: Media = {};
	public imgApi: string = environment.imgApi;
	public vidUrl: string = '';
	public isVideoPlaying: boolean = false;
	constructor(private sanitizer: DomSanitizer, private utilityService: UtilityService) {}

	ngOnInit(): void {}

	iFrameSRC() {
		let _URL = `https://www.youtube.com/embed/${this.video.youtubeId}`;
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
