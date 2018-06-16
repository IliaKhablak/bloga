import { Component, OnInit, EventEmitter,HostListener, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EditService} from '../services/edit.service';
import {keys} from 'config';
import {Post} from '../objects/post';
import {MaterializeAction} from "angular2-materialize";
import {Comment} from '../objects/comment';
import {AuthService} from '../services/auth.service';
import * as $ from 'jquery';
import { trigger, state, animate, transition, style, query, stagger, keyframes } from '@angular/animations';
import {Angular2TokenService} from "angular2-token";
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css'],
  animations: [
  trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('200ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class PostShowComponent implements OnInit {

  @ViewChild('slider') sliderEl;
  @ViewChild('carousel') carouselEl;

	AWS = require('aws-sdk');
  pushed:boolean = false;
  sucess:boolean = false;
  img_upload:boolean = false;
  err:string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  descr:string = '';
  inx:string = null;
  comment = new Comment;
  comments:Comment[] = [];
  news:any;
  // actions = new EventEmitter<string|MaterializeAction>();
  scrollPos:number = 0;
  Counter:number = 0;
  fixed:boolean = false;
  action = new EventEmitter<string|MaterializeAction>();
  carus = new EventEmitter<string|MaterializeAction>();

  constructor(private router:Router,
    private route:ActivatedRoute, 
    public edit:EditService, 
    public authService:AuthService, 
    public auth:Angular2TokenService) {

  }

  theBegin(id){
    this.edit.getComments(id).subscribe(res=>this.comments=res);
  }

  random(){
    return Math.floor((Math.random() * this.edit.posts.length) + 1)-1;
  }

  ngOnInit() {
    this.edit.sideBarVar = 'show';
    this.route.params.subscribe(
      params => {
         let id = params['id'];
        this.edit.getPost(id).subscribe(res=>{
          this.edit.post=res.json();
          // this.sliderEl.nativeElement.classList.toggle('initialized');
          $('.indicators').remove();
          this.action.emit('slider');
          window.setTimeout(()=>{
            this.carus.emit('carousel');
            this.carouselEl.nativeElement.classList.toggle('initialized');
          },1000);
          
          // this.carus.emit('carousel');
          // this.carus.emit('carousel');

        });
        this.edit.getComments(id).subscribe(res=>this.comments=res);
      })
    this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": keys.aws_id, "secretAccessKey": keys.aws_key}});
    window.scrollTo(0,0);
    let timer = Observable.timer(0,5000);
    timer.subscribe(t=>this.theBegin(this.edit.post.id));
  }

  deletePost(id){
      let self = this;
    	if(window.confirm('Desti, are you sure you want to delete this awesome post?')){
  	  	this.edit.deletePost(id).subscribe(res=>{
  	  		this.edit.post.images.forEach(function(el){
  	  			let s3 = new self.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: id+"/"+el[0].split('/')[el[0].split('/').length-1]},function(err, data) {
  		         });
  	  		})
  	  		this.edit.post = new Post;
  	  		this.edit.posts = res;
  	  		this.router.navigate(['/']);
  	  	})
  	  }
  }

  bla(){
    this.pushed = !this.pushed;
  }

  editPost(post){
    this.edit.updatePost(post).subscribe(res=>this.edit.post=res);
  }

  getFile2(fileInput:any){
    let self = this;
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.fileEvent2(file[i]);
    }
  }

  fileEvent2(data:any){
    this.sucess = false;
    this.img_upload = true;
    let self = this;
    let params = {Bucket: keys.aws_bucket, Key: this.edit.post.id+'/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus2').css('width','0%');
      $('#pus2').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.edit.post.images.length;
      self.edit.post.images[a] = [];
      self.edit.post.images[a][0] = 'https://s3-ap-southeast-1.amazonaws.com/'+keys.aws_bucket+'/'+s3res.Key;
      self.openModal();
    });
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  delFromUpl2(idx){

    let self = this;
    if(window.confirm('My love, are you sure you want to delete this picture?')){
      let s3 = new this.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: self.edit.post.id+'/'+this.edit.post.images[idx][0].split('/')[this.edit.post.images[idx][0].split('/').length-1]},function(err, data) {
        if (data){
          self.edit.post.images.splice(idx, 1);
          self.edit.updatePost(self.edit.post).subscribe(res=>self.edit.post=res);
        }else{console.log(err)}
      }); 
    }
    
  }

  add_descr(){
    this.closeModal();
    let a = this.edit.post.images.length;
    if (this.inx){this.edit.post.images[this.inx][1] = this.descr;this.inx=null;}else{this.edit.post.images[a-1][1] = this.descr;}
    this.descr = '';
    this.edit.updatePost(this.edit.post).subscribe(res=>this.edit.post=res);
  }

  openModal() {
      this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
      this.modalActions.emit({action:"modal",params:['close']});
  }

  edit_descr(inx){
    this.inx = inx.toString();;
    this.descr = this.edit.post.images[inx][1];
    this.openModal();
  }

  add_com(comment:Comment){
    comment.post_id = this.edit.post.id;
    if (this.edit.user.id) comment.user_id = this.edit.user.id;
    if (this.edit.user.email) comment.user_email = this.edit.user.email;
    if (!comment.user_name) comment.user_name = this.edit.user.name;
    this.edit.createComment(comment).subscribe(res=>this.comments=res);
  }

  deleteComment(id_com,id_post){
    if(window.confirm('Are you sure you want to delete this comment?')){
      this.edit.deleteComment(id_com,id_post).subscribe(res=>this.comments=res);
    }
  }

   ngAfterViewChecked(){
     let a = document.getElementsByClassName('sb-group') as HTMLCollectionOf<HTMLElement>;
     for (let i=0;i<a.length;i+=1){
       a[i].style.display = "block";
     }
   }

   goToShow(id):void {
    let postLink = ['/posts', id];
    this.router.navigate(postLink);
    this.ngOnInit();
  }

   @HostListener ('window:scroll' ,['$event'])
   onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (offset > this.scrollPos) {
          this.Counter +=1
      } else {
          this.Counter -=1
      }
      this.scrollPos = offset;
      if (this.scrollPos > 205){this.fixed = true}else{this.fixed = false}
  }

}
