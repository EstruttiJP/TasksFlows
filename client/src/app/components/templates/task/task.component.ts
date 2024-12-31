import { AuthService } from './../../../services/auth.service';
import { Component, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../../../services/task.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../dialog/delete-task/delete-task.component';
import { UpdateTaskComponent } from '../dialog/update-task/update-task.component';
import { Project } from '../../../services/project.model';

@Component({
  selector: 'app-task',
  standalone: false,

  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.readTasks();
  }

  pageSize = 6;
  pageIndex = 0;
  totalElements = 10;
  direction = 'asc';

  hidePageSize = false;
  showPageSizeOptions = false;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalElements = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.readTasks();
  }

  readTasks() {
    this.taskService.readTasks(this.pageIndex, this.pageSize, this.direction).subscribe(response => {
      this.tasks = response._embedded?.taskVOList || [];
      this.totalElements = response.page.totalElements;
    })
  }


  createTask() {
    this.router.navigate(["home/task/create"])
  }

  navigateToTask(id: number) {
    this.router.navigate(["home/task/" + id + "/comments"])
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pendente':
        return '#e53935';
      case 'em andamento':
        return '#d98b26';
      case 'concluída':
        return '#4ad926';
      default:
        return '#000'; // Cor padrão, se necessário
    }
  }


  readonly dialog = inject(MatDialog);

  openDialogDeleteTask(name: string, id: number): void {
    this.dialog.open(DeleteTaskComponent, {
      data: {
        name: name,
        id: id
      }
    });
  }

  openDialogUpdateTask(id: number): void {
    this.dialog.open(UpdateTaskComponent, {
      data: {
        id: id
      }
    });
  }
}
