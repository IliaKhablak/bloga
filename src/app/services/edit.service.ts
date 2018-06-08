import { Injectable, EventEmitter } from '@angular/core';
import {Subject, Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {MaterializeAction} from "angular2-materialize";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Post} from '../objects/post';
import {Comment} from '../objects/comment';
import {User} from '../objects/user';

@Injectable()
export class EditService {
	carouselEl = document.getElementById('carousel');
	actions = new EventEmitter<string|MaterializeAction>();
	urls:string[] = [];
	headers: Headers;
	options: RequestOptions;
	private prodsUrl = 'http://0.0.0.0:3000/themes';
  private postsUrl = 'http://0.0.0.0:3000/posts';
  private commentsUrl = 'http://0.0.0.0:3000/comments';
  private usersUrl = 'http://0.0.0.0:3000/user_blas';
  post = new Post;
  posts:Post[] = [];
  user = new User;
  cats:Post[] = [];
  catsItem:Post[] = null;


  constructor(private http:Http) {
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
    return this.http.put(this.prodsUrl+'/1',JSON.stringify({images:image}),this.options).map((res: Response) => res.json())
  }

  getComments(id): Observable<Comment[]>{
    return this.http.get(this.commentsUrl+"/"+id)
      .map((response: Response) => <Comment[]>response.json())
  }

  createComment(comment:Comment){
    return this.http.post(this.commentsUrl,JSON.stringify(comment),this.options)
      .map((res: Response) => res.json());
  }

  deleteComment(id_com, id_post){
    return this.http.delete(this.commentsUrl+'/'+id_com+','+id_post, this.options)
      .map((res: Response) => res.json());
  }

  createUser(user:User){
    return this.http.post(this.usersUrl,JSON.stringify(user),this.options)
      .map((res: Response) => res.json());
  }

  getUser(id): Observable<User>{
    return this.http.get(this.usersUrl+"/"+id)
      .map((response: Response) => <User>response.json())
  }

  deleteUser(id){
    return this.http.delete(this.usersUrl+'/'+id, this.options)
      .map((res: Response) => res.json());
  }

  updateUser(user:User): Observable<User>{
    return this.http.put(this.usersUrl +'/'+user.id,JSON.stringify(user),this.options).map((res: Response) => res.json())
  }

}