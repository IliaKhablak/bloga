export class Post {
	constructor(
		public id?: number,
		public title?: string,
		public style?: string,
		public img_description?: string,
		public images?: string[],
		public text?: string,
		public count?: number,
		public category?: string,
		public created_at?: string
	){}
}
