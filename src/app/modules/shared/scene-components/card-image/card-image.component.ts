import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/app/models/Media.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-card-image',
	templateUrl: './card-image.component.html',
	styleUrls: [ './card-image.component.scss' ]
})
export class CardImageComponent implements OnInit {
	@Input() image: Media = {};
	public imgURL: string = '';
	public imgApi: string = environment.imgApi;
	constructor() {}

	ngOnInit(): void {
		this.imgURL = `${this.imgApi}/uploads/media/${this.image.id}.png`;
	}
}
