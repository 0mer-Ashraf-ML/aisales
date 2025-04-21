import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProspectsStore } from '../../store/prospects.store';
import { Cbutton2Component } from '../../components/cbutton2/cbutton2.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProspectsService } from '../../services/prospects.service';
import { Cbutton1Component } from "../../components/cbutton1/cbutton1.component";

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule, Cbutton2Component, RouterLink, Cbutton1Component],
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit {
  prospects: any[] = [];

  constructor(private prospectsService: ProspectsService, private route: ActivatedRoute){};

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
    console.log("Company Id: ",companyId)
    this.prospectsService.getProspects(companyId).subscribe(
      (data) => {
        this.prospects = data.data;
      },
      (error) => {
        console.error('Error fetching prospects:', error);
      }
    );
  }
}