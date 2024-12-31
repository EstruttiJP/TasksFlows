import { TaskService } from './../../../../services/task.service';
import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../../../services/project.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-project',
  standalone: false,

  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateProjectComponent>);
  data = inject(MAT_DIALOG_DATA);
  project: Project;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.readProjectsById(this.data.id).subscribe((project)=>{
      this.project = project;
    })
  }

  updateProject() {
    this.taskService.updateProject(this.project).subscribe(() => {
      this.taskService.showMessage("Projeto atualizado com sucesso!");
      this.dialogRef.close();
    });
  }

}
