import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News } from '../models/News.model';

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	private api: string = environment.api;
	public $_news: Promise<News[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getNews(): Promise<News[]> {
		this.$_news = this.http
			.get<News[]>(`${this.api}/news/getall`)
			.toPromise()
			.then((res) => <News[]>res)
			.then((data) => {
				return data;
			});
		return this.$_news;
	}

	public getNewsById(id: number): Promise<News | undefined> {
		return this.http
			.get<News>(`${this.api}/news/GetById?id=${id}`)
			.toPromise()
			.then((res) => <News>res)
			.then((data) => {
				return data;
			});
	}

	public addNews(news: News): Promise<News> {
		return this.http
			.post<News>(`${this.api}/news/Create`, news)
			.toPromise()
			.then((res) => <News>res)
			.then((data) => {
				return data;
			});
	}

	public editNews(News: News): Promise<News> {
		return this.http
			.post<News>(`${this.api}/news/Update`, News)
			.toPromise()
			.then((res) => <News>res)
			.then((data) => {
				return data;
			});
	}

	public deleteNews(NewsId: number) {
		return this.http
			.get<News>(`${this.api}/news/Delete?id=${NewsId}`)
			.toPromise()
			.then((res) => <News>res)
			.then((data) => {
				this.$_news = this.$_news.then((res) => res.filter((Ch) => Ch.id != NewsId));
				return data;
			});
	}
}
