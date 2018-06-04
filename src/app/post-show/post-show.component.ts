import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EditService} from '../services/edit.service';
import {keys} from 'config';
import {Post} from '../objects/post';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {

	AWS = require('aws-sdk');


  constructor(private router:Router,private route:ActivatedRoute, public edit:EditService) {
  	this.route.params.subscribe(
      params => {
      	 let id = params['id'];
      	this.edit.getPost(id).subscribe(res=>this.edit.post=res.json());
      })
  	this.AWS.config.update({region: 'ap-southeast-1', credentials: {"accessKeyId": keys.aws_id, "secretAccessKey": keys.aws_key}});

  }

  ngOnInit() {
  }

  deletePost(id){
  	if(window.confirm('Вы уверены что хотите удалить этот продукт?')){
	  	this.edit.deletePost(id).subscribe(res=>{
	  		this.edit.post.images.forEach(function(el){
	  			let s3 = new self.AWS.S3().deleteObject({Bucket: keys.aws_bucket, Key: id+"/"+el.split('/')[el.split('/').length-1]},function(err, data) {
		         });
	  		})
	  		this.edit.post = new Post;
	  		this.edit.posts = res;
	  		this.router.navigate(['/']);
	  	})
	}
  }

}
