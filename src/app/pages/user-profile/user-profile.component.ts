import { Component } from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Cbutton1Component],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {

}
