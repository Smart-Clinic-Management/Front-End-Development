import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatResponse } from '../_interfaces/response/ChatBot/chat-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'https://localhost:7047/api/ChatBot';

  constructor(private http: HttpClient) {}

  sendMessage(question: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/extract-keyword`, { question }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getDoctorDetailsFromChat(question: string): Observable<any> {
    if (question.toLowerCase().includes('doctor')) {
      const doctorName = question.split('doctor')[1].trim();
      return this.http.get(`${this.baseUrl}/doctor-details?name=${doctorName}`);
    }
    return new Observable();
  }
}
