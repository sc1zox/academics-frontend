import {Component, inject} from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {AnalysisService} from '../../analysis.service';

@Component({
  selector: 'app-progress',
  imports: [
    MatProgressBar
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  private aS = inject(AnalysisService);
  public completionPercentage = this.aS.completionPercentage;
}
