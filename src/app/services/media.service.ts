import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Media } from '../models/Media.model';

@Injectable({
	providedIn: 'root'
})
export class MediaService {
	private api: string = environment.api;
	public $_media: Promise<Media[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getAllMedia(): Promise<Media[]> {
		this.$_media = this.http
			.get<Media[]>(`${this.api}/Media/getall`)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
		return this.$_media;
	}

	public getMediaById(id: number): Promise<Media | undefined> {
		return this.http
			.get<Media>(`${this.api}/Media/get?id=${id}`)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}
	public getMediaByCharacterId(id: number): Promise<Media[]> {
		return this.http
			.get<Media[]>(`${this.api}/Media/GetByCharacter?id=${id}`)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
	}

	public addMedia(Media: Media): Promise<Media> {
		return this.http
			.post<Media>(`${this.api}/Media/Create`, Media)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}

	public editMedia(Media: Media): Promise<Media> {
		return this.http
			.post<Media>(`${this.api}/Media/Update`, Media)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				return data;
			});
	}

	public deleteMedia(MediaId: number) {
		return this.http
			.get<Media>(`${this.api}/Media/Delete?id=${MediaId}`)
			.toPromise()
			.then((res) => <Media>res)
			.then((data) => {
				this.$_media = this.$_media.then((res) => res.filter((Ch) => Ch.id != MediaId));
				return data;
			});
	}

	public getMediaByTagIds(ids:number[]): Promise<Media[]> {
		return this.http
			.post<Media[]>(`${this.api}/Media/GetByTagIds`, ids)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
	}

	public GetByCharacterAndTags(model:any): Promise<Media[]> {
		return this.http
			.post<Media[]>(`${this.api}/Media/GetByCharacterAndTag`, model)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
	}

	public GetByCharacter(model:any): Promise<Media[]> {
		return this.http
			.post<Media[]>(`${this.api}/Media/GetByCharacter`, model)
			.toPromise()
			.then((res) => <Media[]>res)
			.then((data) => {
				return data;
			});
	}
}
