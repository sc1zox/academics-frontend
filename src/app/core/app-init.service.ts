import {Injectable} from '@angular/core';
import {CourseService} from '../features/course-page/course.service';
import {ArenaService} from '../features/arena-page/arena.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private courseService: CourseService, private arenaService: ArenaService) {
  }

  public init(){
    console.log("App initializing...");
    this.courseService.getAllCourses();
    this.arenaService.getAllAugments();
  }

}
