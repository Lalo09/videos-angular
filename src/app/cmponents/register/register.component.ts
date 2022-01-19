import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public user:any;
  public status: string;
  public message: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Register';
    this.user = new User(1,'','','','','ROLE_USER','');
    this.status = '';
    this.message = '';
   }

  ngOnInit(): void {
    
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status = 'success') {
          this.status = 'success';
          this.message = response.message;
          form.reset();
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        this.status = 'error';
        this.message = 'Server error'
        console.log(error);
      }
    );
  }

}
