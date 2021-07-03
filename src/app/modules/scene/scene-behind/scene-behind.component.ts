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
		this.media.getAllMedia().then((res) => {
			for (let index = 0; index < res.length; index++) {
				const element = res[index];
				if (element.id) {
					this.tagsService.getTagsByMediaId(element.id).then((tags) => {
						element.tags = tags;
						if(index == 0){
							if(element.mediaType == 1 && element.tags?.find(T => T.tag1 == 'behind_scences')){
								this.mainScene = element;
							}
						}else{
							if(element.mediaType == 1 && element.tags?.find(T => T.tag1 == 'behind_scences')){
								this.scenes.push(element)
							}
							if(element.mediaType == 2 && element.tags?.find(T => T.tag1 == 'behind_scences')){
								this.images.push(element)
							}
						}
					});
				}
			}
		});
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
