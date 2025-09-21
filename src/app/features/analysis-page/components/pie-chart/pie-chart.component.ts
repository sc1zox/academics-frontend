import {AfterViewInit, Component, Input, OnChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnChanges, AfterViewInit {
  @Input({required: true}) grades!: number[];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public pieChartData: ChartData<'pie'> = {
    labels: [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0],
    datasets: [
      {
        data: [],
        label: 'Grade',
        backgroundColor: [
          'rgba(1,90,1,0.7)',     // 1.0
          'rgba(29,129,0,0.7)',    // 1.3
          'rgba(102, 204, 0, 0.7)',   // 1.7
          'rgba(153, 179, 0, 0.7)',   // 2.0
          'rgba(204, 153, 0, 0.7)',   // 2.3
          'rgba(255, 128, 0, 0.7)',   // 2.7
          'rgba(255, 102, 0, 0.7)',   // 3.0
          'rgba(255, 77, 0, 0.7)',    // 3.3
          'rgba(255, 51, 0, 0.7)',    // 3.7
          'rgba(255, 26, 0, 0.7)',    // 4.0
          'rgba(255, 0, 0, 0.7)'      // 5.0
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
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
      }
    }
  };

  ngAfterViewInit(): void {
    this.updateChart();
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    if (this.grades?.length) {
      this.pieChartData.datasets[0].data = [...this.grades];
      this.chart.update();
    }
  }
}
