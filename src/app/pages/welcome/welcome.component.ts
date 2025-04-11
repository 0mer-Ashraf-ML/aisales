import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  message: string = '';

  constructor(private router: Router) {}

  goToChatbot() {
    const trimmedMessage = this.message.trim();
    if (trimmedMessage) {
      this.router.navigate(['/chatbot'], {
        queryParams: { message: trimmedMessage }
      });
    }
  }
}
