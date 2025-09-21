import {Component, OnInit} from '@angular/core';
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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip, PieController, ArcElement);

@Component({
  selector: 'app-analysis-page',
  imports: [
    BarChartComponent,
    AverageGradeDisplayComponent,
    PieChartComponent
  ],
  templateUrl: './analysis-page.component.html',
  styleUrl: './analysis-page.component.css'
})


export class AnalysisPageComponent implements OnInit {

  public grades: number[] = [];
  public avgGrade: number = 0;

  constructor(private analysisService: AnalysisService) {
  }

  public ngOnInit() {
    this.grades = this.analysisService.getGradeOccurrence();
    this.avgGrade = Math.round(this.analysisService.getAverageGrade() * 1000) / 1000;
  }
}
