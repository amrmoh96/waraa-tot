import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/app/models/Media.model';

@Component({
	selector: 'app-scene-card',
	templateUrl: './scene-card.component.html',
	styleUrls: [ './scene-card.component.scss' ]
})
export class SceneCardComponent implements OnInit {
	@Input() video: Media = {};
	constructor() {}

	ngOnInit(): void {}
}
