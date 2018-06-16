import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {PostShowComponent} from './post-show/post-show.component';
import {GalleryComponent} from './gallery/gallery.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {ContactComponent} from './contact/contact.component';
import {ServiceComponent} from './service/service.component';

const routes: Routes = [
	{
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/:id',
    component: PostShowComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'aboutme',
    component: AboutMeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
