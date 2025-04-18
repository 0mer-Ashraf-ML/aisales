import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LatestChatService } from '../../services/latestChat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-agent.component.html',
})
export class AiAgentComponent implements OnInit {
  latestChat: any[] = [];
  sessionId: string = '';
  userInput: string = '';

  constructor(
    private router: Router,
    private srv: LatestChatService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.srv.getLatestChat().subscribe({
      next: (data) => {
        console.log(data);
        this.latestChat = data.conversation;
        this.sessionId = data.session_id;
        this.toastr.success('Conversation loaded successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error fetching latest chat:', error);
        this.toastr.error('Failed to load chat conversation', 'Error');
      },
    });
  }

  goToChatbot() {
    if (!this.userInput.trim()) return;

    this.router.navigate(['/chatbot'], {
      queryParams: {
        message: this.userInput,
        session: this.sessionId,
      },
    });
  }
}
