import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './cmponents/home/home.component';
import { ErrorComponent } from './cmponents/error/error.component';
import { LoginComponent } from './cmponents/login/login.component';
import { RegisterComponent } from './cmponents/register/register.component';
import { UserEditComponent } from './cmponents/user-edit/user-edit.component';
import { VideoNewComponent } from './cmponents/video-new/video-new.component';

import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { VideoEditComponent } from './cmponents/video-edit/video-edit.component';
import { VideoDetailComponent } from './cmponents/video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    VideoNewComponent,
    VideoEditComponent,
    VideoDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule

  ],
  providers: [appRoutingProviders,IdentityGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
