import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/app/models/Media.model';
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
	constructor() {}

	ngOnInit(): void {
		this.vidUrl = `${this.imgApi}/Media/GetMedia?id=${this.video.id}`;
		console.log(this.vidUrl);
	}
}
