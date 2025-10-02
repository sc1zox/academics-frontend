import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatProgressBar
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  public completionPercentage = input.required<number>();
}
