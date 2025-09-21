import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {DecimalPipe, KeyValuePipe} from '@angular/common';

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
  @Input({required: true}) neededAvg?: Record<number, number>;

}
