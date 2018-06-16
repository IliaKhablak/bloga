import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { trigger, state, animate, transition, style } from '@angular/animations';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  animations: [
     trigger(
      'popupAnim', [
        transition('void => *', 
        [
          style({opacity: 0}),
          animate('600ms', style({opacity: 1}))
        ]),
        transition('* => void', 
        [
          style({opacity: 1}),
          animate('00ms', style({opacity: 0}))
        ])
        ]
        )]
})
export class ServiceComponent implements OnInit {

	idx2:boolean = false;
	idx3:boolean = false;

  constructor() {
  	// $(document).ready(function(){
  	// 	$('.cont').mouseenter(function(){
  	// 		$(this).css('width', '105%');
  	// 		// $('.hexagon').css('width', '80%');
  	// 	})
  	// 	$('.cont').mouseleave(function(){
  	// 		$(this).css('width', '100%');
  	// 		// $('.hexagon').css('width', '100%');
  	// 	})
  	// })
  	// $(document).ready(function(){
  	// 	$('.circle').mouseenter(function(){
  	// 		$(this).css('width', '55%;');
  	// 		$('.circle').css('width', '45%;');
  	// 	})
  	// 	$('.cont').mouseleave(function(){
  	// 		$(this).css('width', '50%;');
  	// 		$('.circle').css('width', '50%;');
  	// 	})
  	// })
  }

  ngOnInit() {
  }

}
