import { Component, OnInit, HostListener } from '@angular/core';
import {EditService} from '../services/edit.service';
import {MaterializeDirective} from "angular2-materialize";
import * as $ from 'jquery';
import { trigger, state, animate, transition, style, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
  trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'scale(0.0)', offset: 0}),
            style({opacity: .5, transform: 'scale(0.5)',  offset: 0.3}),
            style({opacity: 1, transform: 'scale(1.0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),
  trigger(
      'popupAnim', [
        transition('void => *', [
          style({transform: 'translateY(-100%)',opacity: 0}),
          animate('400ms', style({transform: 'translateY(0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateY(0)',opacity: 1}),
          animate('400ms', style({transform: 'translateY(100%)',opacity: 0}))
        ])
        ]
        )
  ]
})
export class GalleryComponent implements OnInit {

	scrollPos:number = 0;
  Counter:number = 0;
  fixed:boolean = false;



  constructor(public edit:EditService) { 
  	this.edit.sideBarVar = 'norm';
    $(document).ready(function(){
      $('video').mouseenter(function(){
        $(this).attr('controls',"");
      })
      $('video').mouseleave(function(){
        $(this).removeAttr('controls');
      })
    })
  }

  ngOnInit() {

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
      if (this.scrollPos > 500){this.fixed = true}else{this.fixed = false}
      
  }

  goUp(){
    window.scrollTo(0,0);
  }

}
