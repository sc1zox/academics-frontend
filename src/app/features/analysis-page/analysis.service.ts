import {effect, Injectable, WritableSignal} from '@angular/core';
import {CourseService} from '../course-page/course.service';
import {Course} from '../../shared/interfaces/course';
import {SectionEnum} from '../../shared/interfaces/section.enum';

const gradeSteps = [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0];

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  public courses: WritableSignal<Course[]>;
  public grades: number[] = [];
  private maxEcts: number = 180;
  private a5Ects: number = 13;
  private currentEcts: number = 0;
  private weightedGrades: number = 0;

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.courses;
    this.grades = this.courses().map(c => c.grade);
    this.recalculate();

    effect(() => {
      this.grades = this.courses().map(c => c.grade);
      this.recalculate();
    });
  }

  public recalculate() {
    let weightedGrades: number = 0;
    let currentEcts: number = 0;
    for (const c of this.courses()) {
      if (c.section !== SectionEnum.A5) {
        weightedGrades += c.grade * c.ects;
        currentEcts += c.ects;
      }
    }
    this.weightedGrades = weightedGrades;
    this.currentEcts = currentEcts;
  }

  public getGradeOccurrence() {
    const counts: Record<number, number> = {};
    this.grades.forEach((g) => counts[g] = (counts[g] || 0) + 1);

    const uniqueSorted = Array.from(new Set(this.grades)).sort((a, b) => a - b);

    return uniqueSorted.map((grade) => counts[grade]);
  }

  public getAverageGrade() {
    return this.weightedGrades / this.currentEcts;
  }

  public requiredGradesForTargets(): Record<number, number> {
    const result: Record<number, number> = {};

    const relevantMaxEcts = this.maxEcts - this.a5Ects;
    const remainingEcts = relevantMaxEcts - this.currentEcts;

    for (const target of gradeSteps) {
      const needed =
        (target * (this.currentEcts + remainingEcts) - this.weightedGrades) /
        remainingEcts;

      result[target] = gradeSteps.find((g) => g >= needed) ?? 5.0;
    }

    return result;
  }

}
