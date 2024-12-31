import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  username = ''

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
      this.username = this.authService.getUsername();
  }

  navigateToUser(){
    this.router.navigate(['home/user'])
  }
  
  navigateToProjects(){
    this.router.navigate(['home'])
  }

  navigateToTasks(){
    this.router.navigate(['home/task'])
  }
}
