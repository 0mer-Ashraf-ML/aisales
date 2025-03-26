import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class InfoComponent implements OnInit {
  params: { [key: string]: string } = {};
  paramKeys: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.params = queryParams;
      this.paramKeys = Object.keys(queryParams);
    });
  }
}
