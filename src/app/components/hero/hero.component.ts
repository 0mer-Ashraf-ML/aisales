import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypewriterDirective } from '../../directives/typewriter.directive';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TypewriterDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private commonSrv: CommonService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.commonSrv.isLoggedIn();
  }

  navigateToDashboardOrRegister(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
