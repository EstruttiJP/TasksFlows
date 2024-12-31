import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './views/admin/admin.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { UserRegisterComponent } from './components/templates/user-register/user-register.component';
import { ProjectComponent } from './components/templates/project/project.component';
import { LoadingComponent } from './components/templates/loading/loading.component';
import { UserComponent } from './components/templates/user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteProjectComponent } from './components/templates/dialog/delete-project/delete-project.component';
import { DeleteUserComponent } from './components/templates/dialog/delete-user/delete-user.component';
import { DeleteTaskComponent } from './components/templates/dialog/delete-task/delete-task.component';
import { TaskComponent } from './components/templates/task/task.component';
import { UpdateProjectComponent } from './components/templates/dialog/update-project/update-project.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectRegisterComponent } from './components/templates/project-register/project-register.component';
import { UpdateTaskComponent } from './components/templates/dialog/update-task/update-task.component';
import { TaskRegisterComponent } from './components/templates/task-register/task-register.component';
import { MatChipsModule } from '@angular/material/chips';
import { TaskCommentsComponent } from './components/templates/task-comments/task-comments.component';
import { MatListModule } from '@angular/material/list';
import { ProjectReadComponent } from './components/templates/project-read/project-read.component';
import { UpdateStatusTaskComponent } from './components/templates/dialog/update-status-task/update-status-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    ProjectComponent,
    LoadingComponent,
    UserRegisterComponent,
    UserComponent,
    DeleteProjectComponent,
    DeleteUserComponent,
    DeleteTaskComponent,
    TaskComponent,
    UpdateProjectComponent,
    ProjectRegisterComponent,
    UpdateTaskComponent,
    TaskRegisterComponent,
    TaskCommentsComponent,
    ProjectReadComponent,
    UpdateStatusTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
