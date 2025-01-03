import { Injectable } from '@angular/core';
import { User } from './user.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrlAuth = "http://localhost:8080/auth";
  private readonly baseUrlUsers = "http://localhost:8080/api/users/v1";
  private readonly TOKEN_KEY = 'accessToken';
  private readonly EMAIL = 'email';
  private readonly FULLNAME = 'fullName';
  private readonly USER_ID = 'id';


  constructor(private snackBar: MatSnackBar, private http: HttpClient, private loadingService: LoadingService) { }

  signin(user: User): Observable<User> {
    console.table(user)
    const url = `${this.baseUrlAuth}/signin`;
    return this.http.post<User>(url, user).pipe(
      map((response) => {
        this.setToken(response.accessToken, response.email, response.fullName, response.id);
      }),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  register(user: User): Observable<User> {
    console.table(user)
    const url = `${this.baseUrlAuth}/register`;
    const headers = this.createHeaders();
    return this.http.post<User>(url, user, {headers}).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );
  }
  
  findAllUsers(): Observable<User[]>{
    const headers = this.createHeaders();
    return this.http.get<User[]>(this.baseUrlUsers, {headers}).pipe(map(obj => obj), catchError(e => this.errorHandler(e)))
  }
  
  findUserById(id: number): Observable<User>{
    const url = `${this.baseUrlUsers}/${id}`;
    const headers = this.createHeaders();
    return this.http.get<User>(url, {headers}).pipe(map(obj => obj), catchError(e => this.errorHandler(e)))
  }

  deleteUser(id: number): Observable<User> {
    const headers = this.createHeaders();
    const url = `${this.baseUrlUsers}/${id}`;
    
    return this.http.delete<User>(url, {headers}).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );
    
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken(),
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

  setToken(token: string, email: string, fullname: string, userId: number): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EMAIL, email);
    localStorage.setItem(this.FULLNAME, fullname);
    localStorage.setItem(this.USER_ID, userId.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.FULLNAME);
  }

  getIdUser(): number | null {
    const userId = localStorage.getItem(this.USER_ID);
    return userId ? parseInt(userId, 10) : null;
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.loadingService.hide();
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
