import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CompanyStore } from '../../store/company.store';
import { CompanyService } from '../../services/company.service';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, Cbutton1Component],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  companies: any = [];
  
    constructor(private companyStore: CompanyStore, private companyService: CompanyService){};
  
    ngOnInit(): void {
      // this.company = this.companyStore.company();
      // console.log("Company: ",this.company);
      this.companyService.getCompanies().subscribe((data) => {
        this.companies = data.data;
        console.log("fdgdfgd ",this.companies)
      })
    }
  isExpanded: boolean = false;
  
details:any[] = [
  {
    title: 'New Visitors',
    quantity: '0'
  },
  {
    title: 'Unique Visitors ',
    quantity: '0'
  },
  {
    title: 'Leads',
    quantity: '0'
  },
  {
    title: 'Avg. Leads Score ',
    quantity: '0'
  },
  {
    title: 'MQL',
    quantity: '0'
  },
  {
    title: 'CPL',
    quantity: '0'
  },
];
}