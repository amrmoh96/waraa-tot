import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsMedia } from '../models/NewsMedia.model';

@Injectable({
	providedIn: 'root'
})
export class NewsMediaService {
	private api: string = environment.api;
	public $_newsMedia: Promise<NewsMedia[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getNewsMediaById(id: number): Promise<NewsMedia | undefined> {
		return this.http
			.get<NewsMedia>(`${this.api}/NewsMedia/get?id=${id}`)
			.toPromise()
			.then((res) => <NewsMedia>res)
			.then((data) => {
				return data;
			});
	}

	public addNewsMedia(Media: NewsMedia): Promise<NewsMedia> {
		return this.http
			.post<NewsMedia>(`${this.api}/NewsMedia/Create`, Media)
			.toPromise()
			.then((res) => <NewsMedia>res)
			.then((data) => {
				return data;
			});
	}

	public editNewsMedia(NewsMedia: NewsMedia): Promise<NewsMedia> {
		return this.http
			.post<NewsMedia>(`${this.api}/NewsMedia/Update`, NewsMedia)
			.toPromise()
			.then((res) => <NewsMedia>res)
			.then((data) => {
				return data;
			});
	}

	public deleteNewsMedia(NewsMediaID: number) {
		return this.http
			.get<NewsMedia>(`${this.api}/NewsMedia/Delete?id=${NewsMediaID}`)
			.toPromise()
			.then((res) => <NewsMedia>res)
			.then((data) => {
				this.$_newsMedia = this.$_newsMedia.then((res) => res.filter((Ch) => Ch.id != NewsMediaID));
				return data;
			});
	}
}
