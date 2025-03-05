import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts/core';
echarts.use([BarChart, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-kpi',
  standalone: true,
  imports: [CommonModule,NgxEchartsDirective],
  templateUrl: './kpi.component.html'
})

export class KpiComponent {

  chartOption: EChartsCoreOption = {
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
        max: 25,  // Ensure max is appropriate
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
          valueFormatter: function (value:number) {
            return value as number + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: 'Precipitation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value :number) {
            return value as number + ' ml';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        lineStyle: {
          color: '#ff0000' // Red line
        },
        itemStyle: {
          color: '#ff0000' // Red markers (dots)
        },
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };
  
  

  kpis:any[] = [
    {
      title: 'All Visitors',
      quantity: '1000',
      percentage: '100%'
    },
    {
      title: 'Unique Visitors',
      quantity: '90',
      percentage: '90%'
    },
    {
      title: 'All Leads',
      quantity: '700',
      percentage: '70%'
    },
    {
      title: 'Qualified Leads',
      quantity: '600',
      percentage: '60%'
    },
    {
      title: 'Avg. Leads Score',
      quantity: '75%',
      percentage: '60%'
    },
    {
      title: 'CPL',
      quantity: '$4.00',
      percentage: '60%'
    },
  ];
}
