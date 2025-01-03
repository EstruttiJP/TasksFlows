import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: false,
  
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit{
  loading: Observable<boolean>; 

  constructor(private loadingService: LoadingService) {} 
  
  ngOnInit(): void { 
    this.loading = this.loadingService.loading$; 
  }
}
