import { User } from './../../../services/user.model';
import { TaskService } from './../../../services/task.service';
import { Project } from './../../../services/project.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Task } from '../../../services/task.model';
import { LoadingService } from '../../../services/loading.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-register',
  standalone: false,
  templateUrl: './task-register.component.html',
  styleUrl: './task-register.component.css'
})
export class TaskRegisterComponent implements OnInit {

  exit() {
    this.router.navigate(["home/task"]);
  }

  task: Task = {
    name: '',
    description: '',
    creator: '',
    deadline: '',
    projectId: null,
    memberIds: []
  }
  projects: Project[] = [];
  selectedProject: number;
  pageIndex: number = 0;
  pageSize: number = 30;
  direction: string = 'asc';
  totalElements: number = 0;
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.required, Validators.minLength(5)]);
  deadline = new FormControl('', [Validators.required]);
  hide = true;
  errorMessage = '';
  errorDescriptionMessage = '';
  errorNameMessage = '';
  acess = false;


  members: User[];

  // IDs dos membros selecionados
  selectedMembers: number[] = [];

  constructor(private router: Router, private authService: AuthService, private taskService: TaskService, private loadingService: LoadingService) { }


  // Método para buscar todos os usuários
  ngOnInit() {
    this.taskService.readProjects(this.pageIndex, this.pageSize, this.direction).subscribe(response => {
      this.projects = response._embedded?.projectVOList || [];
      this.totalElements = response.page.totalElements;
    })
    this.authService.findAllUsers().subscribe(users => {
      this.members = users;
    })
  }

  updateErrorMessage() {
    if (this.deadline.hasError('required')) {
      this.errorMessage = 'você deve inserir um prazo';
      this.acess = false
    } else {
      this.errorMessage = '';
      this.acess = true
    }
    if (this.name.hasError('required')) {
      this.errorNameMessage = 'você deve inserir um nome para a tarefa';
      this.acess = false
    } else if (this.name.hasError('minlength')) {
      this.errorNameMessage = 'Você deve inserir um nome para a tarefa';
      this.acess = false
    } else {
      this.errorNameMessage = '';
      this.acess = true
    }
    if (this.description.hasError('required')) {
      this.errorDescriptionMessage = 'você deve inserir uma descrição';
      this.acess = false
    } else if (this.description.hasError('minlength')) {
      this.errorDescriptionMessage = 'Deve haver no minimo 5 caracteres';
      this.acess = false
    } else {
      this.errorDescriptionMessage = '';
      this.acess = true
    }
  }

  onProjectChange(event: MatSelectChange) {
    this.selectedProject = event.value;
  }
  // Lida com a alteração da seleção de membros
  onMemberSelectionChange(event: any): void {
    this.selectedMembers = event.value;
  }

  // Remove um membro dos selecionados
  removeMember(memberId: number): void {
    this.selectedMembers = this.selectedMembers.filter((id) => id !== memberId);
  }

  // Obtém o nome do membro pelo ID
  getMemberName(memberId: number): string {
    const member = this.members.find((m) => m.id === memberId);
    return member ? member.fullName : '';
  }

  register() {
    this.task.name = this.name.value;
    this.task.description = this.description.value;
    this.task.creator = this.authService.getUsername();
    this.task.deadline = this.deadline.value;
    this.task.projectId = this.selectedProject;
    this.task.memberIds = this.selectedMembers;
    this.loadingService.show();
    this.taskService.createTask(this.task).subscribe(() => {
      this.loadingService.hide();
      this.authService.showMessage('Task criada com sucesso!');
      this.router.navigate(['/home'])
    })
  }
}
