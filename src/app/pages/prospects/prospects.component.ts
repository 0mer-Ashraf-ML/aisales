import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
export class ProspectsComponent implements OnInit, AfterViewInit {
  prospects: any[] = [];
  showScrollButton = false;
  private readonly SCROLL_THRESHOLD = 1000; // Adjust this value (in pixels) as needed

  constructor(
    private prospectsService: ProspectsService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const companyId = params['company_id'];
      if (companyId) {
        this.fetchProspects(companyId);
      }
    });
  }

  ngAfterViewInit(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show button only when scrolled beyond threshold AND content is tall enough
    const isContentTallEnough = document.body.scrollHeight > window.innerHeight * 2;
    this.showScrollButton = isContentTallEnough && scrollPosition > this.SCROLL_THRESHOLD;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Hide button immediately when clicked (optional)
    this.showScrollButton = false;
  }

  fetchProspects(companyId: string): void {
    this.prospectsService.getProspects(companyId).subscribe({
      next: (data) => {
        this.prospects = data.data;
        setTimeout(() => this.checkScrollPosition(), 0);
      },
      error: (error) => console.error('Error fetching prospects:', error)
    });
  }
}