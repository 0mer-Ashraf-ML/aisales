import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit {
  @Input() chartData: any; // Input for chart data
  @Input() chartOptions: any; // Input for chart options
  @Input() labels: { parameter1: string; parameter2: string; parameter3: string } = {
    parameter1: 'parameter1',
    parameter2: 'parameter2',
    parameter3: 'parameter3'
  };
  @Input() units: { parameter1: string; parameter2: string; parameter3: string } = {
    parameter1: '',
    parameter2: '',
    parameter3: ''
  };

  chartId: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.chartId = 'chart-' + Math.random().toString(36).substring(2, 9);
    this.cdr.detectChanges(); // Manually trigger change detection
    this.initChart();
  }

  initChart(): void {
    const chartDom = document.getElementById(this.chartId);
    if (!chartDom) {
      console.error('Chart container not found for ID:', this.chartId);
      return;
    }

    const myChart = echarts.init(chartDom);
    console.log('ECharts instance:', myChart);

    // Use the provided chart options or fallback to default options
    const option = this.chartOptions || {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: [
          this.labels.parameter1,
          this.labels.parameter2,
          this.labels.parameter3
        ]
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: this.labels.parameter2,
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: `{value} ${this.units.parameter2}`
          }
        },
        {
          type: 'value',
          name: this.labels.parameter3,
          min: 0,
          max: 180,
          interval: 30,
          axisLabel: {
            formatter: `{value} ${this.units.parameter3}`
          }
        }
      ],
      series: [
        {
          name: this.labels.parameter1,
          type: 'bar',
          tooltip: {
            valueFormatter: (value: number) => `${value} ${this.units.parameter1}`
          },
          data: this.chartData?.parameter1
        },
        {
          name: this.labels.parameter2,
          type: 'bar',
          tooltip: {
            valueFormatter: (value: number) => `${value} ${this.units.parameter2}`
          },
          data: this.chartData?.parameter2
        },
        {
          name: this.labels.parameter3,
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: (value: number) => `${value} ${this.units.parameter3}`
          },
          data: this.chartData?.parameter3
        }
      ]
    };

    myChart.setOption(option);
  }
}
