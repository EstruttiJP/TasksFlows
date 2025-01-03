import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { Project } from '../../../services/project.model';
import { AuthService } from '../../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-register',
  standalone: false,

  templateUrl: './project-register.component.html',
  styleUrl: './project-register.component.css'
})
export class ProjectRegisterComponent {

  project: Project = {
    name: '',
    description: '',
    deadline: '',
    creator: '',
  }
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.required, Validators.minLength(5)]);
  deadline = new FormControl('', [Validators.required]);
  errorMessage = '';
  errorDescriptionMessage = '';
  errorDeadlineMessage = '';
  acess = false;

  exit() {
    this.router.navigate(["home"]);
  }

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router, private loadingService: LoadingService) { }


  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'você deve inserir um nome';
      this.acess = false
    } else if (this.name.hasError('minlength')) {
      this.errorMessage = 'Deve haver no minimo 3 caracteres';
      this.acess = false
    } else {
      this.errorMessage = '';
      this.acess = true
    }
    if (this.deadline.hasError('required')) {
      this.errorDescriptionMessage = 'você deve inserir uma descrição';
      this.acess = false
    } else if (this.description.hasError('minlength')) {
      this.errorDescriptionMessage = 'Deve haver no minimo 5 caracteres';
      this.acess = false
    } else {
      this.errorDescriptionMessage = '';
      this.acess = true
    }
    if (this.deadline.hasError('required')) {
      this.errorDeadlineMessage = 'você deve inserir um prazo final';
      this.acess = false
    } else {
      this.errorDeadlineMessage = '';
      this.acess = true
    }
  }

  register() {
    this.project.name = this.name.value;
    this.project.description = this.description.value;
    this.project.deadline = this.deadline.value;
    this.project.creator = this.authService.getUsername();
    this.loadingService.show();
    this.taskService.createProject(this.project).subscribe(() => {
      this.loadingService.hide();
      this.authService.showMessage('Operação realizada com sucesso!');
      this.router.navigate(['/home'])
    })
  }
}
