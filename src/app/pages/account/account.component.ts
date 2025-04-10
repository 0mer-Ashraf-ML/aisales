import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Cbutton1Component } from "../../components/cbutton1/cbutton1.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterModule, Cbutton1Component],
  templateUrl: './account.component.html'
})
export class AccountComponent {

  constructor (private authService: AuthService,  private router: Router){
   
  }


   logout(){
    this.authService.logout()
    this.router.navigate(['/']);
        }
}
