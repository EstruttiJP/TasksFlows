import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Project } from '../../../services/project.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-read',
  standalone: false,
  
  templateUrl: './project-read.component.html',
  styleUrl: './project-read.component.css'
})
export class ProjectReadComponent implements OnInit{
  
  project: Project;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.readProjectsById(id).subscribe(project=>{
      this.project = project;
    })
  }

  exit(){
    this.router.navigate(["home"])
  }
}
