import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Project, ProjectResponse } from './project.model';
import { Task, TasksResponse } from './task.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrlProject = "http://localhost:8080/api/projects/v1"
  private readonly baseUrlTask = "http://localhost:8080/api/tasks/v1"


  constructor(private snackBar: MatSnackBar, private http: HttpClient, private authService: AuthService, private router: Router) { }

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

  readProjects(page: number, size: number, direction: string): Observable<ProjectResponse> {
    const url = `${this.baseUrlProject}?page=${page}&size=${size}&direction=${direction}`;
    const headers = this.createHeaders();
    return this.http.get<ProjectResponse>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  readTasks(page: number, size: number, direction: string): Observable<TasksResponse> {
    const url = `${this.baseUrlTask}/ordered?page=${page}&size=${size}&direction=${direction}`;
    const headers = this.createHeaders();
    return this.http.get<TasksResponse>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );
  }

  // `${this.baseUrlProject}?page=${page}&size=${size}&direction=${direction}`

  readProjectsById(id: number): Observable<Project> {
    const url = `${this.baseUrlProject}/${id}`;
    const headers = this.createHeaders();
    return this.http.get<Project>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );

  }

  readTaskById(id: number): Observable<Task> {
    const url = `${this.baseUrlTask}/${id}`;
    const headers = this.createHeaders();
    return this.http.get<Task>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => 
        this.errorHandlerID(e))
    );

  }

  readProjectsByName(name: string, page: number, size: number, direction: string): Observable<ProjectResponse> {
    const url = `${this.baseUrlProject}/findProjectByName/${name}?page=${page}&size=${size}&direction=${direction}`;
    const headers = this.createHeaders();
    return this.http.get<Project>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );

  }
  
  updateProject(project: Project): Observable<Project>{
    const headers = this.createHeaders();
    return this.http.put<Project>(this.baseUrlProject, project, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  updateTask(task: Task): Observable<Task>{
    const headers = this.createHeaders();
    return this.http.put<Task>(this.baseUrlTask, task, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  updateStatusTask(id: number, status: string): Observable<Task>{
    const url = `${this.baseUrlTask}/${id}`;
    const headers = this.createHeaders();
    return this.http.patch<Task>(url, status, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  createProject(project: Project): Observable<Project>{
    const headers = this.createHeaders();
    return this.http.post<Project>(this.baseUrlProject, project, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  createTask(task: Task): Observable<Task>{
    const headers = this.createHeaders();
    return this.http.post<Task>(this.baseUrlTask, task, {headers}).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  deleteProject(id: number): Observable<Project> {
    const headers = this.createHeaders();
    const url = `${this.baseUrlProject}/${id}`;

    return this.http.delete<Project>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );

  }

  deleteTask(id: number): Observable<Task> {
    const headers = this.createHeaders();
    const url = `${this.baseUrlTask}/${id}`;

    return this.http.delete<Task>(url, { headers }).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );

  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage("Ocorreu um erro!: " + e.message, true);
    return EMPTY;
  }

  errorHandlerID(e: any): Observable<any> {
    console.log(e)
    this.showMessage("Ocorreu um erro!: " + e.message, true);
    this.router.navigate(["home"])
    return EMPTY;
  }
}
