import { Component } from '@angular/core';
import { Cbutton1Component } from "../../components/cbutton1/cbutton1.component";

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [Cbutton1Component],
  templateUrl: './leads.component.html'
})
export class LeadsComponent {

}
