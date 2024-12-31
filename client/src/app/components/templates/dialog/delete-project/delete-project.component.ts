import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-delete-project',
  standalone: false,

  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css'
})
export class DeleteProjectComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteProjectComponent>);
  data = inject(MAT_DIALOG_DATA);
  constructor(private taskService: TaskService) { }
  deleteProject() {
    this.taskService.deleteProject(this.data.id).subscribe(() => {
      this.taskService.showMessage("Projeto excluido com sucesso!");
      this.dialogRef.close();
    });
  }
}
