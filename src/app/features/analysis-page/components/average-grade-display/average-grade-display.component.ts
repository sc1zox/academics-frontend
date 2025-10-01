import {Component, computed, inject} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {AnalysisService} from '../../analysis.service';

@Component({
  selector: 'app-average-grade-display',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './average-grade-display.component.html',
  styleUrl: './average-grade-display.component.css'
})
export class AverageGradeDisplayComponent {
  private aS = inject(AnalysisService);
  public avgGrade = computed(()=> Math.round(this.aS.averageGrade()*1000)/1000);
}
