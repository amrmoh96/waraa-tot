import { HttpClient } from '@angular/common/http';
import { Feedback } from './../models/feedback.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FeedbackService {
	private api: string = environment.api;
	constructor(private http: HttpClient) {}

	public addFeedback(feedback: Feedback): Promise<Feedback> {
		return this.http
			.post<Feedback>(`${this.api}/Feedback/Create`, feedback)
			.toPromise()
			.then((res) => <Feedback>res)
			.then((data) => {
				return data;
			});
	}
}
