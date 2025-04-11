import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // For ngModel
import { ChatHistoryService } from '../../services/chatHistory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  message: string = '';
  chatHistory: any[] = [];

  constructor(private router: Router, private srv: ChatHistoryService) {}

  ngOnInit(): void {
    this.srv.getChatHistory().subscribe(
      (data: { sessions: any[] }) => {
        console.log('HIstory',data)
        this.chatHistory = data.sessions;
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
    
  }

  goToChatbot() {
    const trimmedMessage = this.message.trim();
    if (trimmedMessage) {
      this.router.navigate(['/chatbot'], {
        queryParams: { message: trimmedMessage },
      });
    }
  }
}
