import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatHistoryService } from '../../services/chatHistory.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {
  message: string = '';
  chatHistory: any[] = [];

  constructor(
    private router: Router,
    private srv: ChatHistoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.srv.getChatHistory().subscribe({
      next: (data: { sessions: any[] }) => {
        this.chatHistory = data.sessions;
        this.toastr.success('Chat history loaded successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error fetching chat history:', error);
        this.toastr.error('Failed to load chat history', 'Error');
      }
    });
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
