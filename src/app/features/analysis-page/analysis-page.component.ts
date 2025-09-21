import {Component} from '@angular/core';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {AnalysisService} from './analysis.service';
import {AverageGradeDisplayComponent} from './components/average-grade-display/average-grade-display.component';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PieController,
  Title,
  Tooltip
} from 'chart.js';
import {GradeAchievementComponent} from './components/grade-achievement/grade-achievement.component';
import {ProgressComponent} from './components/progress/progress.component';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip, PieController, ArcElement);

@Component({
  selector: 'app-analysis-page',
  imports: [
    BarChartComponent,
    AverageGradeDisplayComponent,
    PieChartComponent,
    GradeAchievementComponent,
    ProgressComponent
  ],
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.css'
})


export class AnalysisPageComponent {

  public grades: number[] = [];
  public avgGrade: number = 0;
  public neededAvg?: Record<number, number>;
  public completionPercentage: number = 0;
  public maxEcts: number = 0;
  public totalCurrentEcts: number = 0;

  constructor(private analysisService: AnalysisService) {
    this.grades = this.analysisService.getGradeOccurrence();
    this.avgGrade = Math.round(this.analysisService.getAverageGrade() * 1000) / 1000;
    this.neededAvg = this.analysisService.requiredGradesForTargets();
    this.completionPercentage = this.analysisService.getCompletionPercentage();
    this.totalCurrentEcts = this.analysisService.getTotalCurrentEcts();
    this.maxEcts = this.analysisService.getMaxEcts();
  }
}
