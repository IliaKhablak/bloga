import { Component, OnInit } from '@angular/core';
import {keys} from 'config';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Angular2TokenService} from "angular2-token";
import * as $ from 'jquery';
import {EditService} from '../services/edit.service';
import {Post} from '../objects/post';

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
  urls:string[]=[];

  constructor(public authTokenService:Angular2TokenService,
              public authService:AuthService,
              private router:Router,
              public edit:EditService
              ) 
  {
  	this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": keys.aws_id, "secretAccessKey": keys.aws_key}});
  	
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
        let s3 = new self.AWS.S3().copyObject({Bucket: keys.aws_bucket+'/'+res.id, CopySource: keys.aws_bucket+'/'+el.split('/')[el.split('/').length-1], Key: el.split('/')[el.split('/').length-1]}, function(err, data) {
        
         let s3 = new self.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: el.split('/')[el.split('/').length-1]},function(err, data) {
             
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
    let params = {Bucket: keys.aws_bucket, Key: 'themes/'+this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus').css('width','0%');
      $('#pus').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.edit.urls.length;
      let urlsa = self.edit.urls;
      urlsa[a] = 'https://s3-ap-southeast-1.amazonaws.com/'+keys.aws_bucket+'/'+s3res.Key;
      self.edit.updateTheme(urlsa).subscribe(res=>self.edit.urls=res.image)
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
    let params = {Bucket: keys.aws_bucket, Key: this.makeid(), Body: data};
    let s3 = new this.AWS.S3.ManagedUpload({params: params});
    s3.on('httpUploadProgress', function(evt) {
      $('#pus2').css('width','0%');
      $('#pus2').css('width',evt.loaded*100/evt.total+'%');
    }).send(function(error, s3res) { 
      if (error) {self.err = error.message;}else{self.sucess = true;};
      let a = self.urls.length;
      self.urls[a] = 'https://s3-ap-southeast-1.amazonaws.com/'+keys.aws_bucket+'/'+s3res.Key;
    });
  }

  delFromUpl2(idx){
    let self = this;
    let s3 = new this.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: this.urls[idx].split('/')[this.urls[idx].split('/').length-1]},function(err, data) {
      if (data){self.urls.splice(idx, 1);}else{console.log(err)}
    }); 
    
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
    let s3 = new this.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: 'themes/'+this.edit.urls[idx].split('/')[this.edit.urls[idx].split('/').length-1]},function(err, data) {
      if (data){
      	self.edit.urls.splice(idx, 1);
      	self.edit.updateTheme(self.edit.urls).subscribe(res=>self.edit.urls=res.image)
      }else{console.log(err)}
    }); 
    
  }

}