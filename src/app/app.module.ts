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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    ProfileComponent,
    PostShowComponent,
    GalleryComponent,
    AboutMeComponent,
    ContactComponent,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterializeModule,
    FormsModule,
    HttpModule,
    Ng2PicaModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    HttpClientModule,
    HttpClientJsonpModule,
    ShareButtonsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [Angular2TokenService,AuthService,AuthGuard,EditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
