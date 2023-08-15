import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageQueue: Message[] = [];
  private messageSource = new Subject<void>();
  message$ = this.messageSource.asObservable();

  showMessage(message: Message, duration: number = 5000) {
    this.messageQueue.push(message);
    this.messageSource.next();

    setTimeout(() => {
      this.removeMessage(message);
    }, duration);
  }

  getMessageQueue(): Message[] {
    return this.messageQueue;
  }

  removeMessage(message: Message) {
    const index = this.messageQueue.indexOf(message);
    if (index !== -1) {
      this.messageQueue.splice(index, 1);
      this.messageSource.next();
    }
  }
}
