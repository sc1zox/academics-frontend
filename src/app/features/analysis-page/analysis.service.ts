import {computed, inject, Injectable} from '@angular/core';
import {CourseService} from '../course-page/course.service';
import {SectionEnum} from '../../shared/interfaces/section.enum';

export const gradeSteps = [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0];
export const a5Ects = 13;
export const maxEcts = 180;

export const relevantMaxEcts = maxEcts - a5Ects;

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private courseService = inject(CourseService);

  public courses = this.courseService.courses;
  public grades = computed(() => this.courses().map(c => c.grade));
  public currentEcts = computed(() => this.calculateCurrentEcts());
  public weightedGrades = computed(() => this.calculateWeightedGrades());
  public totalCurrentEcts =
    computed(() => this.courses().reduce((acc, c) => acc + c.ects, 0));
  public averageGrade = computed(() => Math.round((this.weightedGrades() / this.currentEcts())*1000)/1000);
  public completionPercentage = computed(() => (this.totalCurrentEcts() / maxEcts) * 100);
  public gradeOccurrence = computed(() => this.calculateGradeOccurrence());
  public requiredGradesForTargets = computed(() => this.calculateRequiredGradesForTargets());
  public remainingEcts = computed(() => relevantMaxEcts - this.currentEcts());

  private calculateCurrentEcts() {
    return this.courses().filter(c => c.section !== SectionEnum.A5).reduce((acc, c) => acc + c.ects, 0);
  }

  private calculateWeightedGrades() {
    return this.courses().filter(c => c.section !== SectionEnum.A5).reduce((acc, c) => acc + c.grade * c.ects, 0);
  }

  private calculateGradeOccurrence() {
    const counts: Record<number, number> = {};
    this.grades().forEach((g) => counts[g] = (counts[g] || 0) + 1);
    const uniqueSorted = Array.from(new Set(this.grades())).sort((a, b) => a - b);
    return uniqueSorted.map((grade) => counts[grade]);
  }

  private calculateRequiredGradesForTargets() {
    const result: Record<number, number> = {};

    const currentWeighted = this.weightedGrades();
    const currEcts = this.currentEcts();
    const remaining = this.remainingEcts();

    if (remaining <= 0) {
      for (const target of gradeSteps) {
        result[target] = (currEcts > 0 && this.averageGrade() <= target) ? 0 : Infinity;
      }
      return result;
    }

    for (const target of gradeSteps) {
      const numerator = target * relevantMaxEcts - currentWeighted;
      result[target] = numerator / remaining;
    }

    return result;
  }
}
