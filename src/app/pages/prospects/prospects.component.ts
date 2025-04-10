import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProspectsStore } from '../../store/prospects.store';
import { Cbutton2Component } from '../../components/cbutton2/cbutton2.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProspectsService } from '../../services/prospects.service';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule, Cbutton2Component, RouterLink],
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit {
  prospects: any[] = [];

  constructor(private prospectStore: ProspectsStore, private prospectsService: ProspectsService, private route: ActivatedRoute){};

  ngOnInit(): void {
    // Retrieve the company_id from the query parameters
    this.route.queryParams.subscribe(params => {
      const companyId = params['company_id'];  // Access the query parameter
      if (companyId) {
        this.fetchProspects(companyId);  // Call the method with the company_id
      }
    });
  }

  fetchProspects(companyId: string): void {
    this.prospectsService.getProspects(companyId).subscribe(
      (data) => {
        this.prospects = data.data;  // Assign the fetched data to the prospects array
      },
      (error) => {
        console.error('Error fetching prospects:', error);
      }
    );
  }
}