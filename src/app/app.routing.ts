import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";

import { ErrorComponent } from "./cmponents/error/error.component";
import { LoginComponent } from "./cmponents/login/login.component";
import { RegisterComponent } from "./cmponents/register/register.component";
import { HomeComponent } from "./cmponents/home/home.component";
import { UserEditComponent } from "./cmponents/user-edit/user-edit.component";
import { VideoNewComponent } from "./cmponents/video-new/video-new.component";
import { VideoEditComponent } from "./cmponents/video-edit/video-edit.component";
import { IdentityGuard } from "./services/identity.guard";
import { VideoDetailComponent } from "./cmponents/video-detail/video-detail.component";

const appRoutes: Routes = [

    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'home/:page',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'logout/:sure',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'error',component:ErrorComponent},
    {path:'settings',component:UserEditComponent,canActivate:[IdentityGuard]},
    {path:'save-video',component:VideoNewComponent,canActivate:[IdentityGuard]},
    {path:'edit-video/:id',component:VideoEditComponent,canActivate:[IdentityGuard]},
    {path:'video/:id',component:VideoDetailComponent,canActivate:[IdentityGuard]},
    {path:'**',component:ErrorComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);