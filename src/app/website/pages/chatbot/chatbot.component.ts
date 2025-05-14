import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../_services/chat.service';
import { ChatResponse } from '../../../_interfaces/response/ChatBot/chat-response.interface';
import { DoctorService } from '../../../_services/doctor.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  messages: { content: string, sender: 'user' | 'bot' }[] = [];
  userInput: string = '';
  suggestedDoctor: { name: string, age: number, description: string, image: string } | null = null;

  constructor(private chatService: ChatService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.messages.push({ content: 'Hi! How can I help you today?', sender: 'bot' });
  }

  sendMessage(): void {
    if (this.userInput.trim()) {
      this.messages.push({ content: this.userInput, sender: 'user' });

      this.chatService.sendMessage(this.userInput).subscribe(
        (response: ChatResponse) => {
          const botMessage = response?.keyword;

          if (botMessage && botMessage.toLowerCase().includes('doctor')) {
            this.getSuggestedDoctor();
          } else {
            this.messages.push({ content: botMessage || 'Sorry, I did not understand your request.', sender: 'bot' });
          }
        },
        (error) => {
          console.error('Error fetching response from bot:', error);
          this.messages.push({ content: 'Sorry, there was an error. Please try again later.', sender: 'bot' });
        }
      );

      this.userInput = '';
    }
  }

  getSuggestedDoctor(): void {
    // عرض الأطباء المتخصصين في الأطفال
    const doctors = [
      { Id: 18, FirstName: 'Alex', LastName: 'Smith', Age: 40, Image: 'https://localhost:7047/uploads/f92d1a96-1f3c-4c56-a477-5df9e4415157.jpg', Specialization: 'Pediatrics', Description: 'Neurologist focusing on brain and nerve disorders.', WaitingTime: 30 },
      { Id: 21, FirstName: 'Susan', LastName: 'Miller', Age: 43, Image: 'https://localhost:7047/uploads/f92d1a96-1f3c-4c56-a477-5df9e4415157.jpg', Specialization: 'Pediatrics', Description: 'Ophthalmologist with a focus on vision correction and eye surgeries.', WaitingTime: 10 }
    ];

    const pediatricDoctors = doctors.filter(doctor => doctor.Specialization.toLowerCase() === 'pediatrics');

    if (pediatricDoctors.length > 0) {
      const doctor = pediatricDoctors[0];  // افترضنا أن الشات يختار الطبيب الأول
      this.suggestedDoctor = {
        name: `${doctor.FirstName} ${doctor.LastName}`,
        age: doctor.Age,
        description: doctor.Description,
        image: doctor.Image,
      };

      this.messages.push({ content: `I suggest Dr. ${this.suggestedDoctor.name}, who is ${this.suggestedDoctor.age} years old. He/She is specialized in Pediatrics. ${this.suggestedDoctor.description}`, sender: 'bot' });
    } else {
      this.messages.push({ content: 'Sorry, I could not find a pediatric doctor at the moment.', sender: 'bot' });
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }
}
