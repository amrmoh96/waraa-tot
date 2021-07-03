import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	private renderer: Renderer2;

	constructor(private rendererFactory: RendererFactory2) {
		this.renderer = this.rendererFactory.createRenderer(null, null);
	}

	public bodyUnscrollable(): void {
		this.renderer.addClass(document.body, 'no-scroll');
	}

	public bodyScrollable(): void {
		this.renderer.removeClass(document.body, 'no-scroll');
	}
}
