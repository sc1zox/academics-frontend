import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DecimalPipe, KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-grade-achievement',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public requiredGradesForTargets = input.required<Record<string, number>>();
}
