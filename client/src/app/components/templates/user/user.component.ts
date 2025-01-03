import { AuthService } from './../../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../dialog/delete-user/delete-user.component';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  displayedColumns = ['id', 'email', 'fullName', 'permissions', 'action'];

  constructor(private authService: AuthService, private router: Router) { }

  createUser() {
    this.router.navigate(["home/user/create"]);
  }

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers(){
    this.authService.findAllUsers().subscribe(users => {
      this.users = users;
    })
  }
  readonly dialog = inject(MatDialog);

  openDialog(fullName: string, id: number): void {
    this.dialog.open(DeleteUserComponent, {
      data:{
        fullName: fullName,
        id: id
      }
    });
  }
}
