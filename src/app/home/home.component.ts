import { Component, OnInit, HostListener } from '@angular/core';
import {EditService} from '../services/edit.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { ShareButtons } from '@ngx-share/core';
import { trigger, state, animate, transition, style, query, stagger, keyframes } from '@angular/animations';
import {Post} from '../objects/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
     trigger(
      'popupAnim', [
        transition('void => *', [
          style({transform: 'scale(0.0)',opacity: 0}),
          animate('1000ms', style({transform: 'scale(1.0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateX(0)',opacity: 1}),
          animate('00ms', style({transform: 'translateX(-100%)',opacity: 0}))
        ])
        ]
        ),
     trigger(
      'popupAnim2', [
        transition('void => *', [
          style({transform: 'translateX(100%)',opacity: 0}),
          animate('1000ms', style({transform: 'translateX(0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateX(0)',opacity: 1}),
          animate('400ms', style({transform: 'translateX(100%)',opacity: 0}))
        ])
        ]
        ),
     trigger(
      'popupAnim3', [
        transition('void => *', [
          style({opacity: 0}),
          animate('1000ms', style({opacity: 1}))
        ]),
        transition('* => void', [
          style({opacity: 1}),
          animate('400ms', style({opacity: 0}))
        ])
        ]
        ),
     trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  scrollPos:number = 0;
  Counter:number = 0;
  main:boolean = false;
  side:boolean = false;
  posts:Post[] = [];

  constructor(public edit:EditService,private router:Router,public share: ShareButtons) {
    this.edit.sideBarVar = 'home';
    this.edit.getTheme().subscribe(res=>{
      this.edit.urls=res.images;
      this.edit.homeSlider.emit('slider');
      this.edit.homeCarousel.emit('carousel');
      // window.setTimeout(()=>{
      //   if (this.edit.carouselEl) this.edit.carouselEl.classList.toggle('initialized');
      //   this.edit.actions.emit('carousel');
      // },2000)
    });
  }

  ngOnInit() {
  }

  goToShow(id):void {
    let postLink = ['/posts', id];
    this.router.navigate(postLink);
  }

  catShow(value){
      this.edit.catsItem = this.edit.posts.filter(
          item => item.category.toLowerCase().indexOf(value.toLowerCase()) > -1

      )
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
      // console.log(this.scrollPos)
      if (this.scrollPos > $('.topPos').offset().top){this.main = true}else{this.main = false}
      if (this.scrollPos > $('.postsPos').offset().top-500){this.posts = this.edit.posts}else{this.posts = []}
      if (this.scrollPos > $('.imgPos').offset().top-500){this.side = true}else{this.side = false}
  }

  ngAfterViewChecked(){
     let a = document.getElementsByClassName('sb-group') as HTMLCollectionOf<HTMLElement>;
     for (let i=0;i<a.length;i+=1){
       a[i].style.display = "block";
     }
   }


}
