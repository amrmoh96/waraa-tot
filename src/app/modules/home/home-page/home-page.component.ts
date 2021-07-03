import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/News.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: [ './home-page.component.scss' ]
})
export class HomePageComponent implements OnInit {
	public news: News[] = [];
	constructor(private newsService: NewsService, private router: Router) {}

	ngOnInit(): void {
		this.newsService.getNews().then((res) => {
			let startIndex = res.length - 3 || 0;
			let endIndex = res.length || 3;
			this.news = res.slice(startIndex, endIndex);
		});
	}

	navigate(value: any) {
		this.router.navigate([ `./news/${value.id}` ]);
	}
}
