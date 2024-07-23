import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  msg: string = '';
  email: string = '';
  password: string = '';
  @ViewChild('Form') form!: NgForm; // Use ViewChild to reference the form

  constructor(private util: NodeUtilityService, private router: Router) { }
  
  onSubmit(form:any) {
    if (this.form.valid) { // Use this.form to access the form controls
      this.util.update(form.value.email, form.value.password)
        .subscribe((data) => {
          if (data.status) {
            this.msg = data.message;
            alert("Updated Successfully");
            this.router.navigate(['/login']);
          } else {
            alert("Invalid Email or Password");
          }
        });
    }
  }
  
  resetForm() {
    this.form.reset();
    this.msg = '';
  }
}
