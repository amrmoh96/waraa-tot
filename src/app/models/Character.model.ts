// api/Character
export interface Character {
	id?: number;
	firstname?: string;
	lastname?: string;
	intro?: string;
	about?: string;
	gender?: number;
	nickname?: string;
	fullName?: string;
	profileURL?:string;
	order?:number;
}
