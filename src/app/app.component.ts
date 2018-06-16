import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { Observable} from 'rxjs';
import {EditService} from './services/edit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(private authToken:Angular2TokenService,public edit:EditService){
		this.authToken.init(environment.token_auth_config);
	}

  title = 'app';
}
