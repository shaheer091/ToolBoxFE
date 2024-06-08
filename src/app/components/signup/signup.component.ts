import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
  ) {}
  signupForm!: FormGroup;

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ notMatch: true });
      return { notMatch: true };
    } else {
      form.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  submitForm() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.commonService.signupUser(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          if (res.success) {
            this.signupForm.reset();
            this.router.navigate(['/user/home'])
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('signup form not valid');
    }
  }
}
