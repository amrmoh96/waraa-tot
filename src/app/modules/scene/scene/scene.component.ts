import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/models/Media.model';
import { MediaService } from 'src/app/services/media.service';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: [ './scene.component.scss' ]
})
export class SceneComponent implements OnInit {
	public mainScene: Media = {};
	public scenes: Media[] = [];
	constructor(private media: MediaService) {}

	ngOnInit(): void {
		this.media.getAllMedia().then((res) => {
			res = res.filter((M) => M.mediaType == 1);
			this.scenes = res.slice(1);
			this.mainScene = res[0];
		});
	}
}
