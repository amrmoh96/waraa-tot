import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MediaTag } from '../models/MediaTag.model';

@Injectable({
	providedIn: 'root'
})
export class MediaTagService {
	private api: string = environment.api;
	public $_media: Promise<MediaTag[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getMediaTagById(id: number): Promise<MediaTag | undefined> {
		return this.http
			.get<MediaTag>(`${this.api}/MediaTag/get?id=${id}`)
			.toPromise()
			.then((res) => <MediaTag>res)
			.then((data) => {
				return data;
			});
	}

	public addMediaTag(Media: MediaTag): Promise<MediaTag> {
		return this.http
			.post<MediaTag>(`${this.api}/MediaTag/Create`, Media)
			.toPromise()
			.then((res) => <MediaTag>res)
			.then((data) => {
				return data;
			});
	}

	public editMediaTag(MediaTag: MediaTag): Promise<MediaTag> {
		return this.http
			.post<MediaTag>(`${this.api}/MediaTag/Update`, MediaTag)
			.toPromise()
			.then((res) => <MediaTag>res)
			.then((data) => {
				return data;
			});
	}

	public deleteMediaTag(MediaTagID: number) {
		return this.http
			.get<MediaTag>(`${this.api}/MediaTag/Delete?id=${MediaTagID}`)
			.toPromise()
			.then((res) => <MediaTag>res)
			.then((data) => {
				this.$_media = this.$_media.then((res) => res.filter((Ch) => Ch.id != MediaTagID));
				return data;
			});
	}
}
