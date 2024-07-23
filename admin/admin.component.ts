import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  user:string|null='';
  username:string='';
  remove():void{
    if(this.user!=null)
      localStorage.removeItem('user');
      this.user=null;
      this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if(this.user==null || this.user!="admin@gmail.com")
    {
      this.router.navigateByUrl('/home');
    }
    if (this.user) 
    {
      const atIndex = this.user.indexOf('@'); // Find the index of '@' symbol
      if (atIndex !== -1) 
      {
        this.username = this.user.substring(0, atIndex); // Extract the substring before '@'
        console.log(this.username); // This will log the extracted username
      }
    }

  }

  Imagepath: string;

  constructor(private router: Router) {
    this.Imagepath = "../assets/images/Jd-logos.jpeg";
  }
  
}
