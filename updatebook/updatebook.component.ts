import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeUtilityService } from '../node-utility.service';
@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrl: './updatebook.component.css'
})
export class UpdatebookComponent implements OnInit{
  user: string | null = '';
  user1: string = '';
  username: string = '';
  packagetype: string = '';
  email: string = '';
  Imagepath: string = "../assets/images/Jd-logos.jpeg";
  isFetched: boolean = false;

  constructor(private router: Router, private util: NodeUtilityService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user == null || this.user != "admin@gmail.com") {
      this.router.navigateByUrl('/home');
    }
    if (this.user) {
      const atIndex = this.user.indexOf('@');
      if (atIndex !== -1) {
        this.user1 = this.user.substring(0, atIndex);
        console.log(this.user1);
      }
    }
  }

  remove(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  fetchUserDetails(): void {
    if (!this.email) {
        alert('Please enter an email');
        return;
    }

    this.util.findOne1(this.email).subscribe((userData: any) => {
        if (userData.status && userData.user) {
            const user = userData.user;
            this.username = user.username;
            this.packagetype= user.packagetype;
            this.isFetched = true;
        } else {
            alert('User details not found');
            
            this.packagetype= '';
            this.isFetched = false;
        }
    });
}


  updateUser1(): void {
    this.util.updateUser1(this.email,this.packagetype).subscribe((data: any) => {
      if (data.status) {
        alert('Booking updated successfully');
        this.router.navigate(['/admin']);
      } else {
        console.error('Error updating user:', data.message);
      }
    });
  }

}
