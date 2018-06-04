import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {AuthService} from "./services/auth.service";
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from "./guards/auth.guard";
import {EditService} from './services/edit.service';
import { Ng2PicaModule } from 'ng2-pica';
import { PostShowComponent } from './post-show/post-show.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    ProfileComponent,
    PostShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    FormsModule,
    HttpModule,
    Ng2PicaModule
  ],
  providers: [Angular2TokenService,AuthService,AuthGuard,EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
