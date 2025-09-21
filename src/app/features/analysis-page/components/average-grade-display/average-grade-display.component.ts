import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';

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
  @Input({required: true}) avgGrade!: number;
}
