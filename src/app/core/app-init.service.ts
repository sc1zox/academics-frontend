import {Injectable} from '@angular/core';
import {CourseService} from '../features/course-page/course.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private courseService: CourseService) {
  }

  public init(){
    console.log("App initializing...");
    this.courseService.getAllCourses();
  }

}
