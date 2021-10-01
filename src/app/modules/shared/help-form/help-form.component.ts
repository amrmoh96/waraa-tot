import { Feedback } from './../../../models/feedback.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
	selector: 'app-help-form',
	templateUrl: './help-form.component.html',
	styleUrls: [ './help-form.component.scss' ]
})
export class HelpFormComponent implements OnInit {
	public submittedSuccessfully: boolean = false;
	public formHasErrors: boolean = false;
	constructor(private feedbackService: FeedbackService) {}

	ngOnInit(): void {}

	onSubmit(form: NgForm) {
		this.submittedSuccessfully = false;
		this.formHasErrors = false;
		let feedback: Feedback = form.value;
		feedback.creationDate = new Date();

		if (form.valid) {
			this.feedbackService.addFeedback(form.value).then((res) => {
				if (res) {
					this.submittedSuccessfully = true;
					form.resetForm();
				}
			});
		} else {
			this.formHasErrors = true;
			console.log(this.formHasErrors);
		}
	}
}
