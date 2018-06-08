export class Comment {
	constructor(
		public id?: number,
		public text?: string,
		public post_id?:number,
		public user_id?:number,
		public user_name?:string,
		public user_email?:string,
		public created_at?: string
	){}
}
