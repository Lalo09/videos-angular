import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers:[UserService, VideoService]
})
export class VideoEditComponent implements OnInit {

  public identity:any;
  public token:any;
  public video:any;
  public status:any;
  public texto:any;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.texto = "Modify video info";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1,this.identity.sub,'','','','','','');
   }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe(params=>{
      var id = +params['id'];

      this._videoService.getVideo(this.token,id).subscribe(
        response => {
          if (response.status == 'success') {
            this.video = response.video;
          }else{
            this._router.navigate(['/home']);
          }
        },error => {
          console.log(error);
          this.status = error;
        }
      )
    });
  }

  onSubmit(form:any){
    this._videoService.update(this.token,this.video,this.video.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/home']);
        }
        else{
          this.status = 'error';
        }        
        //console.log(response);
    },error => {
      this.status = 'error';
      console.log(error);
    });
  }
}
