import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VideoService } from 'src/app/services/video.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService,VideoService]
})
export class HomeComponent implements OnInit {

  public page_title:string;
  public identity:any;
  public token:any;
  public videos:any;
  public page:any;
  public next_page:any;
  public prev_page:any;
  public number_pages:any;
  public current_page:any;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.page_title = 'My videos';
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.loadUser();
    this._route.params.subscribe(
      params => {
        var page = +params['page'];
        this.current_page = page;
        //alert(page);
        if (!page) {
          page = 1;
          this.prev_page = 1;
          this.next_page = 2;
        }
        //alert(page);
        this.getVideos(page);
      }
    );    
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page:any){
    this._videoService.getVideos(this.token,page).subscribe(
      response => {
        this.videos = response.videos;
        console.log(response);

        //pagination
        var number_pages = [];
        for (var i = 1; i <= response.total_pages; i++) {
          number_pages.push(i);
        }

        this.number_pages = number_pages;

        if (page >= 2) {
          this.prev_page = page-1;
        }
        else{
          this.prev_page = 1;
        }

        if (page < response.total_pages) {
          this.next_page = page+1;
        }else{
          this.next_page = response.total_pages;
        }

      },error=>{
        console.log(error);
      }
    );
  }

  getThumb(url:any, size=null) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }
     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
      return thumburl;
        
  }

  deleteVideo(id:any){
    console.log(id);
    this._videoService.delete(this.token,id).subscribe(
      response => {
        this.getVideos(this.current_page);//Reload actual page
      },error => {
        console.log(error);
      }
    );
  }
   
}
