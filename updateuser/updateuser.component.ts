import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  user: string | null = '';
  user1: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  newEmail: string = '';
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

    this.util.findOne(this.email).subscribe((userData: any) => {
        if (userData.status && userData.user) {
            const user = userData.user;
            this.username = user.username;
            this.password = user.password;
            this.isFetched = true;
        } else {
            alert('User details not found');
            // Reset the username and password fields
            this.username = '';
            this.password = '';
            this.isFetched = false;
        }
    });
}


  updateUser(): void {
    this.util.updateUser(this.username, this.email, this.password).subscribe((data: any) => {
      if (data.status) {
        alert('User updated successfully');
        this.router.navigate(['/admin']);
      } else {
        console.error('Error updating user:', data.message);
      }
    });
  }
}
