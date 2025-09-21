import {Component, OnInit, WritableSignal} from '@angular/core';
import {CourseService} from './course.service';
import {CourseFormComponent} from './components/course-form/course-form.component';
import {CourseMenuComponent} from './components/course-menu/course-menu.component';
import {Course} from '../../shared/interfaces/course';

@Component({
  selector: 'app-course-page',
  imports: [
    CourseFormComponent,
    CourseMenuComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent implements OnInit {

  public courses!: WritableSignal<Course[]>

  constructor(private courseService: CourseService) {
  }

  public ngOnInit() {
    this.courses = this.courseService.courses;
  }

  public createCourse() {
    this.courseService.create({
      name: '',
      code: '',
      ects: 0,
      grade: 0,
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
