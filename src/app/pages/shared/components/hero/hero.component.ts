import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  @Input() heading1: string = '';
  @Input() heading2: string = '';
  
  isLoggedIn = false;

  constructor(private router: Router, private commonSrv: CommonService) {}

  ngOnInit() {
    this.isLoggedIn = this.commonSrv.isLoggedIn();
  }

  navigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
