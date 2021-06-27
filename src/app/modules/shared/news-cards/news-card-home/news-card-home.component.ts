import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/models/News.model';

@Component({
	selector: 'app-news-card-home',
	templateUrl: './news-card-home.component.html',
	styleUrls: [ './news-card-home.component.scss' ]
})
export class NewsCardHomeComponent implements OnInit {
	@Input() newsItem: News = {};
	constructor() {}

	ngOnInit(): void {}
}
