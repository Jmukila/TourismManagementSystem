import { Component, OnInit } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.css'
})
export class ViewuserComponent implements OnInit{
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
  msg:string="";
  Imagepath = "../assets/images/Jd-logos.jpeg";
  sList:any[]=[];
  constructor(private util:NodeUtilityService,private router:Router){
		this.display();
	}

  display() {
    this.util.display().subscribe((data) => {
      if (data.status) {
        this.sList = data.list;
      }
      this.msg = data.message;
    });
  }
}
