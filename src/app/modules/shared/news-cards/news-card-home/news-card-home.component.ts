import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from 'src/app/models/News.model';
import { NewsMedia } from 'src/app/models/NewsMedia.model';
import { MediaService } from 'src/app/services/media.service';
import { NewsMediaService } from 'src/app/services/news-media.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-news-card-home',
	templateUrl: './news-card-home.component.html',
	styleUrls: [ './news-card-home.component.scss' ]
})
export class NewsCardHomeComponent implements OnInit {
	@Input() newsItem: News = {};
	public imgApi: string = environment.imgApi;
	public newsImage: string = '';
	@Output() newsClicked: EventEmitter<any> = new EventEmitter();
	constructor(
		private newsMedia: NewsMediaService,
		private mediaService: MediaService,
		private tagService: TagsService
	) {}

	ngOnInit(): void {
		if (this.newsItem.newsMedia) {
			let media = this.newsItem.newsMedia[0];
			this.newsImage = `${this.imgApi}/Media/GetMedia?id=${media.mediaId}`;
		}
	}

	public navigate($event: Event) {
		$event.preventDefault();
		this.newsClicked.emit({ id: this.newsItem.id });
	}
}
