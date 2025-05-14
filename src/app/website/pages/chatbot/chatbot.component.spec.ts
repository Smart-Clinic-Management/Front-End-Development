import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ChatService } from '../../../_services/chat.service';
import { of } from 'rxjs';

class MockChatService {
  sendMessage(question: string) {
    return of({
      candidates: [
        { content: { parts: [{ text: 'Mocked bot reply' }] } }
      ]
    });
  }
}

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ChatbotComponent],
      providers: [
        { provide: ChatService, useClass: MockChatService } // ✅ استبدال الخدمة الحقيقية بالمزيفة
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
