import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/models/Topic.model';
import { TopicService } from 'src/app/services/topic.service';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: [ './help.component.scss' ]
})
export class HelpComponent implements OnInit {
	public showContactForm: boolean = false;
	topics:Topic[]=[];
	constructor(private UtilityService: UtilityService, private topicService:TopicService) {
		window.scroll(0, 0);
		this.topicService.getTopic().then(res => {
			this.topics = res;
		})
	}

	ngOnInit(): void {}

	showForm() {
		this.UtilityService.bodyUnscrollable();
		this.showContactForm = true;
	}
	hideForm() {
		this.UtilityService.bodyScrollable();
		this.showContactForm = false;
	}
}
