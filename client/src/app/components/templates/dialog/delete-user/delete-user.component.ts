import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-delete-user',
  standalone: false,

  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteUserComponent>);
  data = inject(MAT_DIALOG_DATA);
  constructor(private authService: AuthService) { }
  deleteUser() {
    this.authService.deleteUser(this.data.id).subscribe(() => {
      this.authService.showMessage("Usuário excluido com sucesso!");
      this.dialogRef.close();
    });
  }
}
