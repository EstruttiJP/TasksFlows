import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../services/task.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-update-status-task',
  standalone: false,

  templateUrl: './update-status-task.component.html',
  styleUrl: './update-status-task.component.css'
})
export class UpdateStatusTaskComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateStatusTaskComponent>);
  data = inject(MAT_DIALOG_DATA);

  taskStatuses = [
    { value: 'PENDING', label: 'pendente' },
    { value: 'IN_PROGRESS', label: 'em andamento' },
    { value: 'COMPLETED', label: 'concluída' }];

  updateStatusTask() {
    this.taskService.updateStatusTask(this.data.id, `"${this.data.status}"`).subscribe(() => {
      this.taskService.showMessage("Status atualizado com sucesso!");
      this.dialogRef.close();
    })
  }

  onStatusChange(event: MatSelectChange) {
    this.data.status = event.value;
  }

  constructor(private taskService: TaskService) { }
}
