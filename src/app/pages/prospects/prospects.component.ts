import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProspectsStore } from '../../store/prospects.store';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit {
  prospects: any[] = [];

  constructor(private prostectStore: ProspectsStore){};

  ngOnInit(): void {
    this.prospects = this.prostectStore.prospects();
  }
}
