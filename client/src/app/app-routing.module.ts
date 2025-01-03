import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AdminComponent } from './views/admin/admin.component';
import { UserRegisterComponent } from './components/templates/user-register/user-register.component';
import { ProjectComponent } from './components/templates/project/project.component';
import { UserComponent } from './components/templates/user/user.component';
import { TaskComponent } from './components/templates/task/task.component';
import { ProjectRegisterComponent } from './components/templates/project-register/project-register.component';
import { TaskRegisterComponent } from './components/templates/task-register/task-register.component';
import { TaskCommentsComponent } from './components/templates/task-comments/task-comments.component';
import { ProjectReadComponent } from './components/templates/project-read/project-read.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }, {
    path: "home",
    component: AdminComponent,
    children:[
      {
        path: "",
        component: ProjectComponent
      },{
        path: "project/create",
        component: ProjectRegisterComponent
      },{
        path: "project/:id",
        component: ProjectReadComponent
      },{
        path: "user",
        component: UserComponent
      },{
        path: "user/create",
        component: UserRegisterComponent
      },{
        path: "task",
        component: TaskComponent
      },{
        path: "task/create",
        component: TaskRegisterComponent
      },{
        path: "task/:id/comments",
        component: TaskCommentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
