import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cbutton2Component } from '../../shared/components/cbutton2/cbutton2.component';
import { Cbutton1Component } from '../../shared/components/cbutton1/cbutton1.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProspectsService } from '../../../services/prospects.service';
import { SpinnerService } from '../../../services/spinner.service';
import { finalize, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Cbutton2Component,
    Cbutton1Component,
    NgxSpinnerModule,
  ],
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit, AfterViewInit {
  private readonly prospectsService = inject(ProspectsService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(SpinnerService);

  prospects: any[] = [];
  showScrollButton = false;
  private readonly SCROLL_THRESHOLD = 1000;

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe({
      next: (params) => {
        const companyId = params['company_id'];

        if (!companyId) {
          this.toastr.error('Company ID is required');
          return;
        }

        this.fetchProspects(companyId);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error?.message || 'Failed to load query parameters');
        } else {
          this.toastr.error('An unexpected error occurred');
        }
      }
    });
  }

  private fetchProspects(companyId: string): void {
    this.spinner.show();

    this.prospectsService
      .getProspects(companyId)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (response) => {
          this.prospects = response?.data ?? [];

          if (this.prospects.length > 0) {
            this.toastr.success(`${this.prospects.length} prospects loaded successfully`);
          } else {
            this.toastr.info('No prospects found for this company');
          }
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.toastr.warning('No prospects found for this company');
            } else {
              this.toastr.error(error.error?.message || 'Failed to load prospects');
            }
          } else {
            this.toastr.error('An unexpected error occurred while loading prospects');
          }
          console.error('Error loading prospects:', error);
        },
      });
  }

  ngAfterViewInit(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const contentIsTall = document.body.scrollHeight > window.innerHeight * 2;

    this.showScrollButton =
      contentIsTall && scrollPosition > this.SCROLL_THRESHOLD;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showScrollButton = false;
  }
}