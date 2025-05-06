import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../components/chart/chart.component';

@Component({
  selector: 'app-kpi',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './kpi.component.html'
})

export class KpiComponent {

  kpis:any[] = [
    {
      title: 'All Visitors',
      quantity: '1000',
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
      quantity: '75',
    },
    {
      title: 'CPL',
      quantity: '$4.00'
    },
  ];
}
