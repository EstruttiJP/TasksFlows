import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReadComponent } from './project-read.component';

describe('ProjectReadComponent', () => {
  let component: ProjectReadComponent;
  let fixture: ComponentFixture<ProjectReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
