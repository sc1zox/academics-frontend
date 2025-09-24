import {Injectable} from '@angular/core';
import {CourseService} from '../features/course-page/course.service';
import {LiveGameStatsService} from '../features/live-game-stats-page/live-game-stats.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private courseService: CourseService, private liveGameStatsService: LiveGameStatsService) {
  }

  public init(){
    console.log("App initializing...");
    this.courseService.getAllCourses();
    this.liveGameStatsService.startPolling();
  }

}
