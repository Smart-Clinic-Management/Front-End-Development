import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule ,RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
 {
  isLoggedIn:boolean = false ;
  ImgUrl:string | null = null ;
  UserEmail:string |null = "" ;



  constructor(private authService:AuthService) 
  {}
  ngOnInit(): void {
    

    this.UserEmail = this.authService.GetEmailFromToken()  ;
    

    this.authService.GetProfileImg().subscribe( res => {
      this.ImgUrl = res.data.profileImg;
    } ) ;
    
    this.isLoggedIn = this.authService.isLoggedIn() ;
    
  }

  Logout(){
    this.authService.logout()
    this.isLoggedIn = this.authService.isLoggedIn() ;
  }



}
