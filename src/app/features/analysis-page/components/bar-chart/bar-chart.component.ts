import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartOptions,} from 'chart.js';


@Component({
  selector: 'app-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public gradeOccurrence = input.required();

  public barChartData = computed(() => ({
    labels: [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0],
    datasets: [
      {
        data: this.gradeOccurrence(),
        label: 'Count',
        backgroundColor: 'rgba(30,60,248,0.5)',
      },
    ],
  }));

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {position: 'top'},
      title: {display: true, text: 'Grade Distribution'},
    },
    scales: {
      y: {
        type: 'linear',
        title: {display: true, text: 'Counts'},
        ticks: {stepSize: 1}
      },
      x: {
        title: {display: true, text: 'Grade'},
      }
    }
  };
}
