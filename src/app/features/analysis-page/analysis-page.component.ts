import {Component, inject} from '@angular/core';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {AnalysisService, maxEcts} from './analysis.service';
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
  protected aS = inject(AnalysisService);
  protected readonly maxEcts = maxEcts;
}
