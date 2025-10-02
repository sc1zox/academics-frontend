import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-course-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public course = output<void>()

  public createCourse(): void {
    this.course.emit();
  }
}
