import {Component, OnInit, ViewChild,EventEmitter} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {EditService} from '../services/edit.service';
import {MaterializeAction} from "angular2-materialize";
import {User} from '../objects/user';
import {Angular2TokenService} from "angular2-token";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  modalActions = new EventEmitter<string|MaterializeAction>();
  newOne:boolean = false;

  constructor(public authService:AuthService, private router:Router, public edit:EditService, public auth:Angular2TokenService) {
    this.edit.getTheme().subscribe(res=>{
      this.edit.urls=res.images;
      this.edit.homeSlider.emit('slider');
      // window.setTimeout(()=>{
      //   if (this.edit.carouselEl) this.edit.carouselEl.classList.toggle('initialized');
      //   this.edit.actions.emit('carousel');
      // },2000)
    });
    this.edit.getPosts().subscribe(res=>{
      this.edit.posts=res;
      let a = [];
      let b = 0;
      this.edit.cats = res.filter(item=>{if(a.indexOf(item.category)<0){a[b] = item.category;b+=1;return true;}else{b+=1;return false;}});
    });
    this.edit.getGallery().subscribe(res=>{
      this.edit.galleryImgs=res.images;
      this.edit.galleryVideos=res.videos;
    });
    if(this.authService.loggedIn()){this.edit.getUser(2).subscribe(res=>this.edit.user=res)}
      else{if(localStorage['DestiBlogUser']) {this.edit.getUser(localStorage['DestiBlogUser']).subscribe(res=>this.edit.user=res);}
              else{
                this.newOne = true;
                window.setTimeout(()=>{
                  this.openModal();
                },1000)
              }}
  }

  // onlyUnique(value, a, b) {
  //   if(a.indexOf(value.category))
  // }

  ngOnInit(){}

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);

  }

  catShow(value){
      this.edit.catsItem = this.edit.posts.filter(
          item => item.category.toLowerCase().indexOf(value.toLowerCase()) > -1

      )
  }

  subscribe(user:User){
    user.subscribed = true;
    this.edit.createUser(user).subscribe(res=>{
      this.edit.user=res;
      this.closeModal();
      this.newOne = false;
      localStorage['DestiBlogUser']=res.id;
    });
  }

  openModal() {
      this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
      this.modalActions.emit({action:"modal",params:['close']});
  }

  ngAfterViewChecked(){
     let a = document.getElementsByClassName('sb-group') as HTMLCollectionOf<HTMLElement>;
     for (let i=0;i<a.length;i+=1){
       a[i].style.display = "block";
     }
   }

  unsubscribe(){
    if(window.confirm("If you leave I'll be saaad! :'(")){
      this.edit.user.subscribed = false;
      this.edit.updateUser(this.edit.user).subscribe(res=>{
      this.edit.user=new User;
      this.newOne = true;
      localStorage.removeItem('DestiBlogUser');
    });
    }
  }

}