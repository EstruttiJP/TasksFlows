import { Permission } from '../../../services/permission.enum';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../services/user.model';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-user-register',
  standalone: false,

  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  exit() {
    this.router.navigate(["home/user"]);
  }
  user: User = {
    email: '',
    fullName: '',
    password: '',
    permissions: []
  }
  permissions = Object.values(Permission);
  selectedPermission: Permission;
  email = new FormControl('', [Validators.required, Validators.email]);
  fullName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;
  errorMessage = '';
  errorEmailMessage = '';
  errorNameMessage = '';
  acess = false;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {
    this.selectedPermission = this.permissions[0];
  }

  updateErrorMessage() {
    if (this.fullName.hasError('required')) {
      this.errorNameMessage = 'você deve inserir um nome';
      this.acess = false
    } else {
      this.errorNameMessage = '';
      this.acess = true
    }
    if (this.email.hasError('required')) {
      this.errorEmailMessage = 'você deve inserir uma email';
      this.acess = false
    } else if (this.email.hasError('email')) {
      this.errorEmailMessage = 'Você deve inserir um email';
      this.acess = false
    } else {
      this.errorEmailMessage = '';
      this.acess = true
    }
    if (this.password.hasError('required')) {
      this.errorMessage = 'você deve inserir uma senha';
      this.acess = false
    } else if (this.password.hasError('minlength')) {
      this.errorMessage = 'Deve haver no minimo 4 caracteres';
      this.acess = false
    } else {
      this.errorMessage = '';
      this.acess = true
    }
  }

  onPermissionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedPermission = selectElement.value as Permission;
  }

  register() {
    this.user.email = this.email.value;
    this.user.fullName = this.fullName.value;
    this.user.password = this.password.value;
    this.user.permissions = [this.selectedPermission];
    this.loadingService.show();
    this.authService.register(this.user).subscribe(() => {
      this.loadingService.hide();
      this.authService.showMessage('operação realizada com sucesso!');
      this.router.navigate(['home/user'])
    })
  }
}
