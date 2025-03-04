import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProspectsStore } from '../../store/prospects.store';
import { Cbutton2Component } from '../../components/cbutton2/cbutton2.component';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [CommonModule, Cbutton2Component],
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit {
  prospects: any[] = [];

  constructor(private prostectStore: ProspectsStore){};

  ngOnInit(): void {
    this.prospects = this.prostectStore.prospects();
  }
}
