import { Tag } from "./Tag.model";

// api/Media
export interface Media {
	id?: number;
	mediaUrl?: string;
	mediaType?: number;
	description?: string;
	title?: string;
	youtubeId?: string;
	tags?:Tag[];
}
