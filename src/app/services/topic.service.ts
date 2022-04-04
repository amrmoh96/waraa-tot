import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Topic } from '../models/Topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private api: string = environment.api;
	public $_topic: Promise<Topic[]> = new Promise(() => {});
	constructor(private http: HttpClient) {}

	public getTopic(): Promise<Topic[]> {
		this.$_topic = this.http
			.get<Topic[]>(`${this.api}/topic/getall`)
			.toPromise()
			.then((res) => <Topic[]>res)
			.then((data) => {
				return data;
			});
		return this.$_topic;
	}

	public getTopicById(id: number): Promise<Topic | undefined> {
		return this.http
			.get<Topic>(`${this.api}/topic/get?id=${id}`)
			.toPromise()
			.then((res) => <Topic>res)
			.then((data) => {
				return data;
			});
	}

	public addTopic(topic: Topic): Promise<Topic> {
		return this.http
			.post<Topic>(`${this.api}/topic/create`, topic)
			.toPromise()
			.then((res) => <Topic>res)
			.then((data) => {
				return data;
			});
	}

	public editTopic(Topic: Topic): Promise<Topic> {
		return this.http
			.post<Topic>(`${this.api}/topic/Update`, Topic)
			.toPromise()
			.then((res) => <Topic>res)
			.then((data) => {
				return data;
			});
	}

	public deleteTopic(TopicId: number) {
		return this.http
			.get<Topic>(`${this.api}/topic/Delete?id=${TopicId}`)
			.toPromise()
			.then((res) => <Topic>res)
			.then((data) => {
				this.$_topic = this.$_topic.then((res) => res.filter((Ch) => Ch.id != TopicId));
				return data;
			});
	}
}
