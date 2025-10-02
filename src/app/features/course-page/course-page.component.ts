import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CourseService} from './course.service';
import {CourseFormComponent} from './components/course-form/course-form.component';
import {CourseMenuComponent} from './components/course-menu/course-menu.component';
import {Course} from '../../shared/interfaces/course';

@Component({
  selector: 'app-course-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CourseFormComponent,
    CourseMenuComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {
  private courseService = inject(CourseService)
  public courses = this.courseService.courses;

  public createCourse() {
    this.courseService.create({
      name: '',
      code: '',
      ects: undefined,
      grade: undefined,
      section: ''
    });
  }

  public updateCourse(course: Course) {
    if (course._id) {
      this.courseService.update(course._id, course);
    }
  }

  public deleteCourse(id: string) {
    if (id) {
      this.courseService.delete(id);
    }
  }
}
