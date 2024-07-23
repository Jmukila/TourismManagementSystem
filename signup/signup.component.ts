import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  msg:string='';
  
	constructor(private util: NodeUtilityService, private router: Router) {}
	
  onSubmit(form: any) {
    if (form.valid) {
      this.util.insert(form.value.username, form.value.email, form.value.password)
        .subscribe((data) => {
          if (data.status) {
            console.log("hello");
            this.msg = data.message;
            this.router.navigate(['/thanks']);
          }
        });
    }
  }
  
  resetForm(form: any) {
    form.reset();
    this.msg = '';
  }
}
