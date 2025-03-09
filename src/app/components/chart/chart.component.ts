import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit {
  @Input() chartData: any; // Input for chart data
  @Input() chartOptions: any; // Input for chart options
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
        data: ['Evaporation', 'Precipitation', 'Temperature']
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
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' ml';
            }
          },
          data: this.chartData?.evaporation
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' ml';
            }
          },
          data: this.chartData?.precipitation
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + ' °C';
            }
          },
          data: this.chartData?.temperature
        }
      ]
    };
    myChart.setOption(option);
  }
}