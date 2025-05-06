import { Component } from '@angular/core';
import { Cbutton1Component } from "../shared/components/cbutton1/cbutton1.component";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [Cbutton1Component],
  templateUrl: './wallet.component.html'
})
export class WalletComponent {

}
