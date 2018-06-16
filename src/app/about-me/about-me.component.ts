import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, query, stagger, keyframes } from '@angular/animations';
import {EditService} from '../services/edit.service';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [
  trigger(
      'popupAnim2', [
        transition('void => *', [
          style({transform: 'translateX(-100%)',opacity: 0}),
          animate('0.6s 0.5s ease-in', style({transform: 'translateX(0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateX(0)',opacity: 1}),
          animate('400ms', style({transform: 'translateX(-100%)',opacity: 0}))
        ])
        ]
        ),
  trigger(
      'popupAnim', [
        transition('void => *', [
          style({transform: 'translateX(100%)',opacity: 0}),
          animate('0.6s 1s ease-in', style({transform: 'translateX(0)',opacity: 1}))
        ]),
        transition('* => void', [
          style({transform: 'translateX(0)',opacity: 1}),
          animate('400ms', style({transform: 'translateX(100%)',opacity: 0}))
        ])
        ]
        )
  ]
})
export class AboutMeComponent implements OnInit {

  constructor(private edit:EditService) {
    this.edit.sideBarVar = 'norm';
  }

  ngOnInit() {
  }

}
