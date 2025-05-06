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

  ngOnInit(): void {
    try {
      this.user = this.commonService.getUser()!;
      this.fetchChatHistory();
    } catch (error) {
      this.toastr.error('Failed to initialize component');
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
            this.toastr.success(`${this.chatHistory.length} chat ${this.chatHistory.length === 1 ? 'session' : 'sessions'} loaded`);
          }
        },
        error: (error) => {
          if (error.status === 404) {
            this.chatHistory = [];
            this.toastr.info('No chat history available');
          } else {
            this.toastr.error('Failed to load chat history');
          }
        }
      });
  }

  goToChatbot(): void {
    try {
      const trimmedMessage = this.message.trim();
      
      if (!trimmedMessage) {
        this.toastr.warning('Please enter a message');
        return;
      }

      this.router.navigate(['/chatbot'], {
        queryParams: { message: trimmedMessage },
      });
      
    } catch (error) {
      this.toastr.error('Failed to start chat session');
    }
  }
}