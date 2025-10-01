import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DecimalPipe, KeyValuePipe} from '@angular/common';
import {AnalysisService} from '../../analysis.service';

@Component({
  selector: 'app-grade-achievement',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    KeyValuePipe,
    DecimalPipe
  ],
  templateUrl: './grade-achievement.component.html',
  styleUrl: './grade-achievement.component.css'
})
export class GradeAchievementComponent {
  private aS = inject(AnalysisService);
  public requiredGradesForTargets = this.aS.requiredGradesForTargets;
}
