import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LatestChatService } from '../../../services/latestChat.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './ai-agent.component.html',
})
export class AiAgentComponent implements OnInit {
  latestChat: any[] = [];
  sessionId: string = '';
  userInput: string = '';

  private readonly router = inject(Router);
  private readonly latestChatService = inject(LatestChatService);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.fetchLatestChat();
  }

  private fetchLatestChat(): void {
    this.spinner.show();
    
    this.latestChatService.getLatestChat()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (data: { conversation: any[], session_id: string }) => {
          this.latestChat = data.conversation ?? [];
          this.sessionId = data.session_id;
          
          if (this.latestChat.length > 0) {
            this.toastr.success('Conversation loaded successfully');
          } else {
            this.toastr.info('No conversation history available');
          }
        },
        error: (error) => {
          console.error('Error fetching latest chat:', error);
          if (error.status === 404) {
            this.latestChat = [];
            this.toastr.info('No conversation history available');
          } else {
            this.toastr.error('Failed to load conversation');
          }
        }
      });
  }

  goToChatbot(): void {
    try {
      const trimmedInput = this.userInput.trim();
      
      if (!trimmedInput) {
        this.toastr.warning('Please enter a message');
        return;
      }

      this.router.navigate(['/chatbot'], {
        queryParams: {
          message: trimmedInput,
          session: this.sessionId,
        },
      });
      
    } catch (error) {
      console.error('Chatbot navigation error:', error);
      this.toastr.error('Failed to start chat session');
    }
  }
}