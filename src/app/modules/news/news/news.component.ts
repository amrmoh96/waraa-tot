import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/models/News.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: [ './news.component.scss' ]
})
export class NewsComponent implements OnInit {
	public news: News[] = [];
	constructor(private newService: NewsService, private router: Router) {}

	ngOnInit(): void {
		this.newService.getNews().then((res) => {
			this.news = res;
		});
	}
	navigate(value: any) {
		console.log(value.id);
		this.router.navigate([ `./news/${value.id}` ]);
	}
}
