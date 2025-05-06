import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../../shared/components/cbutton1/cbutton1.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, Cbutton1Component, NgxSpinnerModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  companies: any[] = [];
  today = new Date();
  expandedCompanyId: number | null = null;
  isExpanded: boolean = false;

  private readonly companyService = inject(CompanyService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(SpinnerService);

  details: any[] = [
    { title: 'New Visitors', quantity: '0' },
    { title: 'Unique Visitors', quantity: '0' },
    { title: 'Leads', quantity: '0' },
    { title: 'Avg. Leads Score', quantity: '0' },
    { title: 'MQL', quantity: '0' },
    { title: 'CPL', quantity: '0' },
  ];

  ngOnInit(): void {
    this.fetchCompanies();
  }

  private fetchCompanies(): void {
    this.spinner.show();
    
    this.companyService.getCompanies()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (data: { data: any[] }) => {
          this.companies = data.data ?? [];
          
          if (this.companies.length > 0) {
            this.toastr.success(`${this.companies.length} companies loaded`);
          } else {
            this.toastr.info('No companies found');
          }
        },
        error: (error) => {
          console.error('Error fetching companies:', error);
          if (error.status === 404) {
            this.companies = [];
            this.toastr.info('No companies found');
          } else {
            this.toastr.error('Failed to load companies');
          }
        }
      });
  }

  getDaysRunning(createdAt: string | Date): number {
    const start = new Date(createdAt);
    const diffMs = this.today.getTime() - start.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  toggleExpand(companyId: number): void {
    this.expandedCompanyId = this.expandedCompanyId === companyId ? null : companyId;
  }
}