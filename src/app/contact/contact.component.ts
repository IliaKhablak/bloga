import { Component, OnInit } from '@angular/core';
import {EditService} from '../services/edit.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private edit:EditService) {
  	this.edit.sideBarVar = 'norm';
  }

  ngOnInit() {
  }

}
