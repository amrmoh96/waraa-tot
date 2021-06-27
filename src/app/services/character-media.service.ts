import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharacterMedia } from '../models/CharacterMedia.model';

@Injectable({
	providedIn: 'root'
})
export class CharacterMediaService {
	private api: string = environment.api;
	public $_characterMedia: Promise<CharacterMedia[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getCharacterMediaById(id: number): Promise<CharacterMedia | undefined> {
		return this.http
			.get<CharacterMedia>(`${this.api}/CharacterMedia/get?id=${id}`)
			.toPromise()
			.then((res) => <CharacterMedia>res)
			.then((data) => {
				return data;
			});
	}

	public addCharacterMedia(Media: CharacterMedia): Promise<CharacterMedia> {
		return this.http
			.post<CharacterMedia>(`${this.api}/CharacterMedia/Create`, Media)
			.toPromise()
			.then((res) => <CharacterMedia>res)
			.then((data) => {
				return data;
			});
	}

	public editCharacterMedia(CharacterMedia: CharacterMedia): Promise<CharacterMedia> {
		return this.http
			.post<CharacterMedia>(`${this.api}/CharacterMedia/Update`, CharacterMedia)
			.toPromise()
			.then((res) => <CharacterMedia>res)
			.then((data) => {
				return data;
			});
	}

	public deleteCharacterMedia(CharacterMediaID: number) {
		return this.http
			.get<CharacterMedia>(`${this.api}/CharacterMedia/Delete?id=${CharacterMediaID}`)
			.toPromise()
			.then((res) => <CharacterMedia>res)
			.then((data) => {
				this.$_characterMedia = this.$_characterMedia.then((res) =>
					res.filter((Ch) => Ch.id != CharacterMediaID)
				);
				return data;
			});
	}
}
