import { Injectable, EventEmitter } from '@angular/core';
import {Subject, Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {MaterializeAction} from "angular2-materialize";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Post} from '../objects/post';

@Injectable()
export class EditService {
	carouselEl = document.getElementById('carousel');
	actions = new EventEmitter<string|MaterializeAction>();
	urls:string[] = [];
	headers: Headers;
	options: RequestOptions;
	private prodsUrl = 'http://0.0.0.0:3000/themes';
  private postsUrl = 'http://0.0.0.0:3000/posts';
  post = new Post;
  posts:Post[] = [];


  constructor(private http:Http) {
  	window.setTimeout(()=>{
	  	if (this.carouselEl) this.carouselEl.classList.toggle('initialized');
	    this.actions.emit('carousel');
	},2000)
	this.headers = new Headers({'Content-Type':'application/json'});
    this.options = new RequestOptions({headers:this.headers});
  }

  getPosts(): Observable<Post[]>{
    return this.http.get(this.postsUrl)
      .map((response: Response) => <Post[]>response.json())
  }

  getPost(id){ 
    return this.http.get(this.postsUrl+"/"+id);
  }

  deletePost(id){
    return this.http.delete(this.postsUrl+'/'+id, this.options)
      .map((res: Response) => res.json());
  }

  createPost(post:Post){
    return this.http.post(this.postsUrl,JSON.stringify(post),this.options)
      .map((res: Response) => res.json());
  }

  updatePost(post:Post): Observable<Post>{
    return this.http.put(this.postsUrl+'/'+post.id,JSON.stringify(post),this.options).map((res: Response) => res.json())
  }

  getTheme(): Observable<any>{
  	return this.http.get(this.prodsUrl)
      .map((response: Response) => <any>response.json())
  }

  updateTheme(image): Observable<any>{
    return this.http.put(this.prodsUrl+'/1',JSON.stringify({image:image}),this.options).map((res: Response) => res.json())
  }

}