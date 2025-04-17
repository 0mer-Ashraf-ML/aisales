import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ For ngModel
import { LatestChatService } from '../../services/latestChat.service';

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule
  templateUrl: './ai-agent.component.html',
})
export class AiAgentComponent implements OnInit {
  latestChat: any[] = [];
  sessionId: string = '';
  userInput: string = ''; // ✅ Store input

  constructor(private router: Router, private srv: LatestChatService) {}

  ngOnInit() {
    this.srv.getLatestChat().subscribe((data) => {
      console.log(data);
      this.latestChat = data.conversation;
      this.sessionId = data.session_id; // ✅ Store session ID
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
