import { NewsMedia } from './NewsMedia.model';
// api/news
export interface News {
	id?: number;
	title?: string;
	body?: string;
	creationDate?: Date;
	newsMedia?: NewsMedia[];
}
