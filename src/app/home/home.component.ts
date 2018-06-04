import { Component, OnInit } from '@angular/core';
import {EditService} from '../services/edit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public edit:EditService,private router:Router) { }

  ngOnInit() {
  }

  goToShow(id):void {
    let postLink = ['/posts', id];
    this.router.navigate(postLink);
  }

}
