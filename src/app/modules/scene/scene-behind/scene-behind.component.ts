import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Media } from 'src/app/models/Media.model';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
	selector: 'app-scene-behind',
	templateUrl: './scene-behind.component.html',
	styleUrls: [ './scene-behind.component.scss' ]
})
export class SceneBehindComponent implements OnInit {
	public mainScene: Media = {};
	public scenes: Media[] = [];
	public images: Media[] = [];
	public isVideoPlaying:boolean = false;
	constructor(private media: MediaService, private tagsService: TagsService, private sanitizer:DomSanitizer, private utilityService:UtilityService) {}

	ngOnInit(): void {
		this.media.getMediaByTagIds([8]).then(res => {
			console.log(res);
			this.scenes = res.filter(M => M.mediaType == 1);
			this.images = res.filter(M => M.mediaType == 2);
			this.mainScene = this.scenes[0];
		})
	}


	iFrameSRC(){
		let _URL = `https://www.youtube.com/embed/${this.mainScene.youtubeId}`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(_URL);
	}

	playVideo(){
		this.isVideoPlaying = true;
		this.utilityService.bodyUnscrollable();
	}
	closeVideo(){
		this.isVideoPlaying = false;
		this.utilityService.bodyScrollable();
	}

}
