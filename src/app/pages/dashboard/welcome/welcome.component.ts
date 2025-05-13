import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatHistoryService } from '../../../services/chatHistory.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SlideUpDirective } from '../../../directives/scroll-animate.directive';
import { CommonService } from '../../../services/common.service';
import { IUser } from '../../../models/user.interface';
import { SpinnerService } from '../../../services/spinner.service';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SlideUpDirective, NgxSpinnerModule],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {
  message: string = '';
  chatHistory: any[] = [];
  user!: IUser;

  private readonly router = inject(Router);
  private readonly chatHistoryService = inject(ChatHistoryService);
  private readonly toastr = inject(ToastrService);
  private readonly commonService = inject(CommonService);
  private readonly spinner = inject(SpinnerService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
  try {
    const userId = this.commonService.getUser()?.id;
    if (!userId) {
      this.toastr.error('User ID not found');
      return;
    }

    this.authService.getUser(userId).subscribe({
      next: (res) => {
        this.user = res.data;
        this.fetchChatHistory();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error?.message || 'Failed to fetch user details');
        console.error('User fetch error:', error);
      }
    });
    
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      this.toastr.error(error.error?.message || 'Failed to initialize component');
    } else {
      this.toastr.error('An unexpected error occurred during initialization');
    }
  }
}


  private fetchChatHistory(): void {
    this.spinner.show();
    
    this.chatHistoryService.getChatHistory()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (data: { sessions: any[] }) => {
          this.chatHistory = data.sessions ?? [];
          
          if (this.chatHistory.length === 0) {
            this.toastr.info('No chat history available');
          } else {
            this.toastr.success(`${this.chatHistory.length} chat ${this.chatHistory.length === 1 ? 'session' : 'sessions'} loaded successfully`);
          }
        },
        error: (error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.chatHistory = [];
              this.toastr.info('No chat history available');
            } else {
              this.toastr.error(error.error?.message || 'Failed to load chat history');
            }
          } else {
            this.toastr.error('An unexpected error occurred while loading chat history');
          }
        }
      });
  }

  goToChatbot(): void {
    try {
      const trimmedMessage = this.message.trim();
      
      if (!trimmedMessage) {
        this.toastr.warning('Please enter a message to start the chat');
        return;
      }

      this.router.navigate(['/chatbot'], {
        queryParams: { message: trimmedMessage },
      });
      
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.toastr.error(error.error?.message || 'Failed to start chat session');
      } else {
        this.toastr.error('An unexpected error occurred while starting chat');
      }
    }
  }
}