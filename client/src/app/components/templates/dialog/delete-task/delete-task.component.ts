import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-delete-task',
  standalone: false,

  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteTaskComponent>);
  data = inject(MAT_DIALOG_DATA);
  constructor(private taskService: TaskService) { }
  deleteTask() {
    this.taskService.deleteTask(this.data.id).subscribe(() => {
      this.taskService.showMessage("Tarefa excluida com sucesso!");
      this.dialogRef.close();
    });
  }
}
