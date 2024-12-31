import { LoadingService } from './../../../services/loading.service';
import { CommentsService } from './../../../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../../../services/task.service';
import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../../../services/task.model';
import { AuthService } from '../../../services/auth.service';
import { Comment } from '../../../services/comment.model';
import { User } from '../../../services/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusTaskComponent } from '../dialog/update-status-task/update-status-task.component';

@Component({
  selector: 'app-task-comments',
  standalone: false,

  templateUrl: './task-comments.component.html',
  styleUrl: './task-comments.component.css'
})
export class TaskCommentsComponent implements OnInit {

  exit() {
    this.router.navigate(["home/task"])
  }

  task: Task;
  comment: Comment = {
    userId: 0,
    comment: ''
  };
  comments: Comment[];
  commentsNames: { [key: number]: User } = {};
  projectName: string;
  memberNames: { [key: string]: string } = {};

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private commentsService: CommentsService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService.readTaskById(id).subscribe(task => {
      this.task = task;
      this.taskService.readProjectsById(task.projectId).subscribe(project => {
        this.projectName = project.name;
      })
      this.loadMemberNames(task.memberIds);
    })
    this.commentsService.findAllCommentsInTask(id).subscribe(comments => {
      this.comments = comments;
      this.comments.forEach(memberId => {
        if (memberId.userId && !this.commentsNames[memberId.userId]) {
          this.authService.findUserById(memberId.userId).subscribe(user => {
            this.commentsNames[memberId.userId] = user;
          }
          );
        }
      })
    })
  }

  loadMemberNames(memberIds: number[]): void {
    memberIds.forEach(memberId => {
      if (!this.memberNames[memberId]) {
        this.authService.findUserById(memberId).subscribe(member => {
          this.memberNames[memberId] = member.fullName;
        });
      }
    });
  }

  getCommentName(userId: number): string {
    return this.commentsNames[userId]?.fullName || 'Projeto desconhecido';
  }

  getMemberNames(): string {
    return this.task?.memberIds.map(id => this.memberNames[id] || 'Membro desconhecido').join(', ');
  }

  createComment() {
    this.comment.userId = this.authService.getIdUser()
    this.comment.taskId = +this.route.snapshot.paramMap.get('id');
    this.commentsService.createCommentsInTask(this.comment).subscribe(() => {
      this.commentsService.showMessage("Comentário adicionado com sucesso!");
      this.reloadPage();
    })
  }

  reloadPage(): void {
    this.router.navigate([this.router.url])
      .then(() => {
        window.location.reload();
      });
  }

  readonly dialog = inject(MatDialog);

  openDialogUpdateStatusTask(): void {
    this.dialog.open(UpdateStatusTaskComponent, {
      data: {
        id: this.task.id,
        name: this.task.name,
        status: this.task.status
      }
    });
  }
}
