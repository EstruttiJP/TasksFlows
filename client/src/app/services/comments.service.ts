import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly baseUrlTask = "http://localhost:8080/api/tasks/v1"

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private authService: AuthService) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getToken(),
      'Content-Type': 'application/json'
    });
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  findAllCommentsInTask(id: number): Observable<Comment[]> {
    const url = `${this.baseUrlTask}/${id}/comments`;
    const headers = this.createHeaders();
    return this.http.get<Comment[]>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) =>
        this.errorHandler(e))
    );
  }

  createCommentsInTask(comment: Comment): Observable<Comment> {
    const url = `${this.baseUrlTask}/${comment.taskId}/comments`;
    const headers = this.createHeaders();
    return this.http.post<Comment>(url, comment, { headers }).pipe(
      map((response) => response),
      catchError((e) =>
        this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage("Ocorreu um erro!: " + e.message, true);
    return EMPTY;
  }
}
