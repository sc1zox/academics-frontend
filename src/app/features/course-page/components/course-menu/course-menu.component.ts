import {Component, EventEmitter, Output} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-course-menu',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatButton,
    MatMenuItem
  ],
  templateUrl: './course-menu.component.html',
  styleUrl: './course-menu.component.css'
})
export class CourseMenuComponent {
  @Output() course: EventEmitter<void> = new EventEmitter();

  public createCourse(): void {
    this.course.emit();
  }
}
