import { Injectable } from '@angular/core';
import { Character } from '../models/Character.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CharacterService {
	private api: string = environment.api;
	public _Characters: Promise<Character[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getCharacters(): Promise<Character[]> {
		this._Characters = this.http
			.get<Character[]>(`${this.api}/Character/getall`)
			.toPromise()
			.then((res) => <Character[]>res)
			.then((data) => {
				data.forEach(
					(D) => (D.fullName = `${D.firstname} ${D.lastname} ${D.nickname ? `(${D.nickname})` : ''}`)
				);
				return data;
			});
		return this._Characters;
	}

	public getCharacterById(id: number): Promise<Character | undefined> {
		return this.http
			.get<Character>(`${this.api}/Character/get?id=${id}`)
			.toPromise()
			.then((res) => <Character>res)
			.then((data) => {
				return data;
			});
	}

	public addCharacter(character: Character): Promise<Character> {
		return this.http
			.post<Character>(`${this.api}/Character/Create`, character)
			.toPromise()
			.then((res) => <Character>res)
			.then((data) => {
				return data;
			});
	}

	public editCharacter(character: Character): Promise<Character> {
		return this.http
			.post<Character>(`${this.api}/Character/Update`, character)
			.toPromise()
			.then((res) => <Character>res)
			.then((data) => {
				return data;
			});
	}

	public deleteCharacter(characterId: number) {
		return this.http
			.get<Character>(`${this.api}/Character/Delete?id=${characterId}`)
			.toPromise()
			.then((res) => <Character>res)
			.then((data) => {
				this._Characters = this._Characters.then((res) => res.filter((Ch) => Ch.id != characterId));
				return data;
			});
	}
}
