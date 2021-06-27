import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home-page-banner',
	templateUrl: './home-page-banner.component.html',
	styleUrls: [ './home-page-banner.component.scss' ]
})
export class HomePageBannerComponent implements OnInit {
	public activeSlide:number = 1;
	constructor() {}

	ngOnInit(): void {}

	scrollToNews($event: Event) {
		$event.preventDefault();
		document.getElementById('homepage__latest__news')?.scrollIntoView({behavior:"smooth", block:'nearest'})
	}

	slide(slide:number = 1){
		this.activeSlide = slide;
	}
}
