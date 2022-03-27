import { Character } from './../../../models/Character.model';
import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { MediaService } from 'src/app/services/media.service';
import { TagsService } from 'src/app/services/tags.service';
import { Media } from 'src/app/models/Media.model';
import { Tag } from 'src/app/models/Tag.model';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home-page-banner',
	templateUrl: './home-page-banner.component.html',
	styleUrls: ['./home-page-banner.component.scss']
})
export class HomePageBannerComponent implements OnInit {
	public characters: Character[] = [];
	public activeSlide: number = 0;
	public imgApi: string = environment.imgApi;
	public translate: number = 0;
	public style = { 'transform': 'translateX(0)' }
	public interval: any;
	public media: Media[] = [];
	constructor(
		private characterService: CharacterService,
		private mediaService: MediaService,
		private tagService: TagsService,
	) { }

	ngOnInit(): void {
		this.mediaService.getMediaByTagIds([12]).then(res => {
			this.media = res;
		})
	}

	scrollToNews($event: Event) {
		$event.preventDefault();
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
	}

	slide(slide: number = 1) {
		this.translate = -1 * slide * 40;
		this.activeSlide = slide;
		this.style = { 'transform': `translateX(${this.translate}rem)` }
	}

	ngAfterViewInit() {
		this.interval = setInterval(() => {
			if (this.activeSlide == this.media?.length - 1) {
				this.slide(0)
			} else {
				this.slide(this.activeSlide + 1);
			}
		}, 3000)
	}

	ngOnDestroy() {
		clearInterval(this.interval)
	}
}
