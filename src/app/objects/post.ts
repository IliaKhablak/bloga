export class Post {
	constructor(
		public id?: number,
		public title?: string,
		public style?: string,
		public images?: any[],
		public text?: string,
		public count?: number,
		public category?: string,
		public created_at?: string
	){}
}
