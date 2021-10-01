import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: [ './help.component.scss' ]
})
export class HelpComponent implements OnInit {
	public showContactForm: boolean = false;
	constructor(private UtilityService: UtilityService) {
		window.scroll(0, 0);
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
