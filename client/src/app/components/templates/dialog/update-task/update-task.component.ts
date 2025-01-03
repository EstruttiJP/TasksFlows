import { LoadingService } from './../../../../services/loading.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../../../services/task.model';
import { TaskService } from '../../../../services/task.service';
import { User } from '../../../../services/user.model';
import { Project } from '../../../../services/project.model';
import { MatSelectChange } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateProjectComponent } from '../update-project/update-project.component';

@Component({
  selector: 'app-update-task',
  standalone: false,

  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateProjectComponent>);
  data = inject(MAT_DIALOG_DATA);
  task: Task;
  members: User[];
  pageIndex: number = 0;
  pageSize: number = 30;
  direction: string = 'asc';
  totalElements: number = 0;
  projects: Project[] = [];

  constructor(private authService: AuthService, private taskService: TaskService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.taskService.readProjects(this.pageIndex, this.pageSize, this.direction).subscribe(response => {
      this.projects = response._embedded?.projectVOList || [];
      this.totalElements = response.page.totalElements;
    })
    this.authService.findAllUsers().subscribe(users => {
      this.members = users;
    })
    this.taskService.readTaskById(this.data.id).subscribe(task =>{
      this.task = task;
    })
  }


  onProjectChange(event: MatSelectChange) {
    this.task.projectId = event.value;
  }
  // Lida com a alteração da seleção de membros
  onMemberSelectionChange(event: any): void {
    this.task.memberIds = event.value;
  }

  // Remove um membro dos selecionados
  removeMember(memberId: number): void {
    this.task.memberIds = this.task.memberIds.filter((id) => id !== memberId);
  }

  // Obtém o nome do membro pelo ID
  getMemberName(memberId: number): string {
    const member = this.members.find((m) => m.id === memberId);
    return member ? member.fullName : '';
  }

  updateTask() {
    this.loadingService.show();
    this.taskService.updateTask(this.task).subscribe(() => {
      this.loadingService.hide();
      this.taskService.showMessage("Tarefa atualizado com sucesso!");
      this.dialogRef.close();
    });
  }

}
