import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../services/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;
  errorMessage = '';
  errorPasswordMessage = '';
  acess = false;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService){}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'você deve inserir um email';
      this.acess = false
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Você deve inserir um email';
      this.acess = false
    } else {
      this.errorMessage = '';
      this.acess = true
    }
    if (this.password.hasError('required')) {
      this.errorPasswordMessage = 'você deve inserir um email';
      this.acess = false
    } else if (this.password.hasError('minlength')) {
      this.errorPasswordMessage = 'Deve haver no minimo 4 caracteres';
      this.acess = false
    } else {
      this.errorPasswordMessage = '';
      this.acess = true
    }
  }

  signin() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.loadingService.show();
    this.authService.signin(this.user).subscribe(()=>{
      this.loadingService.hide();
      this.authService.showMessage('operação realizada com sucesso!');
      this.router.navigate(['/home'])
    })
  }
}
