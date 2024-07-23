import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  msg: any;
  username: string = '';
  user: string | null = '';
  Imagepath: string = "../assets/images/Jd-logos.jpeg";
  email: string = '';

  constructor(private router: Router, private util: NodeUtilityService) {}

  deleteUser(form: any): void {
    if (form.valid) {
      let alertShown = false; // Flag to track whether the alert has been shown
      this.util.delete(form.value.email)
        .subscribe((data) => {
          if (data.status) {
            console.log("Hello");
            this.msg = data.message;
            if (!alertShown) {
              alert("Deactivated Successfully");
              alertShown = true;
              form.reset(); // Reset the form
            }
          } else {
            if (!alertShown) {
              if (data.message === 'Email does not exist') {
                alert("Email does not exist");
                form.reset(); // Reset the form
              } else {
                alert("Failed to deactivate user");
                form.reset(); // Reset the form
              }
              alertShown = true;
            }
          }
        }, (error) => {
          console.error("Error:", error);
          if (!alertShown) {
            alert("Failed to deactivate user");
            form.reset(); // Reset the form
            alertShown = true;
          }
        });
    }
  }
  

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    if (this.user == null || this.user != "admin@gmail.com") {
      this.router.navigateByUrl('/home');
    }
    if (this.user) {
      const atIndex = this.user.indexOf('@');
      if (atIndex !== -1) {
        this.username = this.user.substring(0, atIndex);
        console.log(this.username);
      }
    }
  }

  remove(): void {
    if (this.user != null) {
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigate(['/home']);
    }
  }
}
