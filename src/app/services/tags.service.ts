import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../models/Tag.model';

@Injectable({
	providedIn: 'root'
})
export class TagsService {
	private api: string = environment.api;
	public $_tags: Promise<Tag[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getTags(): Promise<Tag[]> {
		this.$_tags = this.http
			.get<Tag[]>(`${this.api}/tag/getall`)
			.toPromise()
			.then((res) => <Tag[]>res)
			.then((data) => {
				return data;
			});
		return this.$_tags;
	}

	public getTagById(id: number): Promise<Tag | undefined> {
		return this.http.get<Tag>(`${this.api}/tag/get?id=${id}`).toPromise().then((res) => <Tag>res).then((data) => {
			return data;
		});
	}

	public getTagsByMediaId(id: number): Promise<Tag[] | undefined> {
		return this.http
			.get<Tag[]>(`${this.api}/tag/GetTagsByMediaID?MediaID=${id}`)
			.toPromise()
			.then((res) => <Tag[]>res)
			.then((data) => {
				return data;
			});
	}

	public addTag(tag: Tag): Promise<Tag> {
		return this.http.post<Tag>(`${this.api}/tag/Create`, tag).toPromise().then((res) => <Tag>res).then((data) => {
			return data;
		});
	}

	public editTag(tag: Tag): Promise<Tag> {
		return this.http.post<Tag>(`${this.api}/tag/Update`, tag).toPromise().then((res) => <Tag>res).then((data) => {
			return data;
		});
	}

	public deleteTags(tagId: number) {
		return this.http
			.get<Tag>(`${this.api}/tag/Delete?id=${tagId}`)
			.toPromise()
			.then((res) => <Tag>res)
			.then((data) => {
				this.$_tags = this.$_tags.then((res) => res.filter((T) => T.id != tagId));
				return data;
			});
	}
}
