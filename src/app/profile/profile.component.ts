import { Component, OnInit, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Angular2TokenService} from "angular2-token";
import * as $ from 'jquery';
import {EditService} from '../services/edit.service';
import {Post} from '../objects/post';
import {MaterializeAction} from "angular2-materialize";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	sucess:boolean = false;
	img_upload:boolean = false;
	err:string;
	AWS = require('aws-sdk');
	post = new Post;
  urls:any[]=[];
  modalActions = new EventEmitter<string|MaterializeAction>();
  descr:string = '';
  inx:string = null;

  constructor(public authTokenService:Angular2TokenService,
              public authService:AuthService,
              private router:Router,
              public edit:EditService
              ) 
  {
  	this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": environment.aws_id, "secretAccessKey": environment.aws_key}});
  	
  }

  ngOnInit() {
  }

  createPost(post:Post){
    let self = this;
    post.images = this.urls;
    this.edit.createPost(post).subscribe(res=>{
      this.urls = [];
      this.sucess = false;
      this.img_upload = false;
      this.edit.posts = res.posts;
       post.images.forEach(function(el){
        let s3 = new self.AWS.S3().copyObject({Bucket: environment.aws_bucket+'/'+res.id, CopySource: environment.aws_bucket+'/'+el[0].split('/')[el[0].split('/').length-1], Key: el[0].split('/')[el[0].split('/').length-1]}, function(err, data) {
        
         let s3 = new self.AWS.S3().deleteObject({Bucket: environment.aws_bucket, Key: el[0].split('/')[el[0].split('/').length-1]},function(err, data) {
             
         }); 
        })   
      })
    })
    alert('post successfully created!');
  }
  

  getFile(fileInput:any){
    let self = this;
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.fileEvent(file[i])
    }
  }

  fileEvent(data:any){
    this.sucess = false;
    this.img_upload = true;
    let self = this;
    let params = {Bucket: environment.aws_bucket, Key: 'themes/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.edit.urls.length;
      let urlsa = self.edit.urls;
      urlsa[a] = 'https://s3-ap-southeast-1.amazonaws.com/'+environment.aws_bucket+'/'+s3res.Key;
      self.edit.updateTheme(urlsa).subscribe(res=>self.edit.urls=res.images)
    });
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
    let params = {Bucket: environment.aws_bucket, Key: this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus2').css('width','0%');
      $('#pus2').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.urls.length;
      self.urls[a] = [];
      self.urls[a][0] = 'https://s3-ap-southeast-1.amazonaws.com/'+environment.aws_bucket+'/'+s3res.Key;
      // self.urls[a][1] = self.add_description();
      self.openModal();
    });
  }

  delFromUpl2(idx){
    let self = this;
    let s3 = new this.AWS.S3().deleteObject({Bucket: environment.aws_bucket, Key: this.urls[idx][0].split('/')[this.urls[idx][0].split('/').length-1]},function(err, data) {
      if (data){self.urls.splice(idx, 1);}else{console.log(err)}
    }); 
    
  }

  add_descr(){
    this.closeModal();
    let a = this.urls.length;
    if(this.inx){this.urls[this.inx][1] = this.descr;this.inx=null;}else{this.urls[a-1][1] = this.descr;}
    this.descr = '';
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  delFromUpl(idx){
    let self = this;
    let s3 = new this.AWS.S3().deleteObject({Bucket: environment.aws_bucket, Key: 'themes/'+this.edit.urls[idx].split('/')[this.edit.urls[idx].split('/').length-1]},function(err, data) {
      if (data){
      	self.edit.urls.splice(idx, 1);
      	self.edit.updateTheme(self.edit.urls).subscribe(res=>self.edit.urls=res.images)
      }else{console.log(err)}
    }); 
    
  }

  openModal() {
      this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
      this.modalActions.emit({action:"modal",params:['close']});
  }

  edit_descr(inx){
    this.inx = inx.toString();;
    this.descr = this.urls[inx][1];
    this.openModal();
  }

  getFile3(fileInput:any){
    let self = this;
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.fileEvent3(file[i])
    }
  }

  fileEvent3(data:any){
    this.sucess = false;
    this.img_upload = true;
    let self = this;
    let params = {Bucket: environment.aws_bucket, Key: 'gallery/images/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.edit.galleryImgs.length;
      let urlsa = self.edit.galleryImgs;
      urlsa[a] = 'https://s3-ap-southeast-1.amazonaws.com/'+environment.aws_bucket+'/'+s3res.Key;
      self.edit.updateGallery(urlsa).subscribe(res=>self.edit.galleryImgs=res.images)
    });
  }

  delFromUpl3(idx){
    let self = this;
    let s3 = new this.AWS.S3().deleteObject({Bucket: environment.aws_bucket, Key: 'gallery/images/'+this.edit.galleryImgs[idx].split('/')[this.edit.galleryImgs[idx].split('/').length-1]},function(err, data) {
      if (data){
        self.edit.galleryImgs.splice(idx, 1);
        self.edit.updateGallery(self.edit.galleryImgs).subscribe(res=>self.edit.galleryImgs=res.images)
      }else{console.log(err)}
    }); 
    
  }

  getFile4(fileInput:any){
    let self = this;
    let file = fileInput.target.files;
    for (let i=0; i < file.length; i++){
      this.fileEvent4(file[i])
    }
  }

  fileEvent4(data:any){
    this.sucess = false;
    this.img_upload = true;
    let self = this;
    let params = {Bucket: environment.aws_bucket, Key: 'gallery/videos/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.edit.galleryVideos.length;
      let urlsa = self.edit.galleryVideos;
      urlsa[a] = 'https://s3-ap-southeast-1.amazonaws.com/'+environment.aws_bucket+'/'+s3res.Key;
      self.edit.updateGalleryVid(urlsa).subscribe(res=>self.edit.galleryVideos=res.videos)
    });
  }

  delFromUpl4(idx){
    let self = this;
    if(window.confirm('Desti, are you sure you want to delete this video?')){
      let s3 = new this.AWS.S3().deleteObject({Bucket: environment.aws_bucket, Key: 'gallery/videos/'+this.edit.galleryVideos[idx].split('/')[this.edit.galleryVideos[idx].split('/').length-1]},function(err, data) {
        if (data){
          self.edit.galleryVideos.splice(idx, 1);
          self.edit.updateGalleryVid(self.edit.galleryVideos).subscribe(res=>self.edit.galleryVideos=res.videos)
        }else{console.log(err)}
      }); 
      
      }
    }

}