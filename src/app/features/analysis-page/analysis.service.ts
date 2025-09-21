import {effect, Injectable, WritableSignal} from '@angular/core';
import {CourseService} from '../course-page/course.service';
import {Course} from '../../shared/interfaces/course';
import {SectionEnum} from '../../shared/interfaces/section.enum';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  public courses: WritableSignal<Course[]>;
  public grades: number[] = [];
  private maxEcts: number = 180;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.courses;
    this.grades = this.courses().map(c => c.grade);
    effect(() => {
      this.grades = this.courses().map(c => c.grade);
    });
  }

  public getGradeOccurrence() {
    const counts: Record<number, number> = {};
    this.grades.forEach((g) => counts[g] = (counts[g] || 0) + 1);

    const uniqueSorted = Array.from(new Set(this.grades)).sort((a, b) => a - b);

    return uniqueSorted.map((grade) => counts[grade]);
  }

  public getAverageGrade() {
    let gradesTimesEcts = 0;
    let ects = 0;
    for (const c of this.courses()) {
      if (c.section !== SectionEnum.A5) {
        gradesTimesEcts += c.grade * c.ects;
        ects += c.ects;
      }
    }
    return gradesTimesEcts / ects;
  }
}
