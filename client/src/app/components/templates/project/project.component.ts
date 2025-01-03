import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Project } from '../../../services/project.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectComponent } from '../dialog/delete-project/delete-project.component';
import { UpdateProjectComponent } from '../dialog/update-project/update-project.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: false,

  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  projectName = ""

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.readProjects();
  }


  pageSize = 8;
  pageIndex = 0;
  totalElements = 30;
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
    this.readProjects();
  }

  readProjects() {
    this.taskService.readProjects(this.pageIndex, this.pageSize, this.direction).subscribe(response => {
      this.projects = response._embedded?.projectVOList || [];
      this.totalElements = response.page.totalElements;
    })
  }

  findProjectsByName() {
    this.taskService.readProjectsByName(this.projectName, 0, this.pageSize, this.direction).subscribe(response => {
      this.projects = response._embedded?.projectVOList || [];
      this.totalElements = response.page.totalElements;
    })
  }

  createProject(){
    this.router.navigate(["home/project/create"])
  }

  viewProject(id: number){
    this.router.navigate(["home/project/"+id])
  }

  readonly dialog = inject(MatDialog);

  openDialogDeleteProject(name: string, id: number): void {
    this.dialog.open(DeleteProjectComponent, {
      data: {
        name: name,
        id: id
      }
    });
  }

  openDialogUpdateProject(id: number): void {
    this.dialog.open(UpdateProjectComponent, {
      data: {
        id: id
      }
    });
  }

}
