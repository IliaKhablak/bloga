import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {EditService} from '../services/edit.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;


  constructor(public authService:AuthService, private router:Router, private edit:EditService) {
    this.edit.getTheme().subscribe(res=>this.edit.urls=res.image);
    this.edit.getPosts().subscribe(res=>this.edit.posts=res);
  }

  ngOnInit(){}

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);

  }

}