import { Component, inject } from '@angular/core';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { Message } from '../../core/interfaces/message';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class MessageComponent {
  showMessage = false;
  message: Message[] = [];

  private messagesToRemove: Set<number> = new Set();
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.messageService.message$.subscribe(() => {
      this.message = this.messageService.getMessageQueue();
      this.showMessage = true;
    });
  }

  animationDone(index: number) {
    if (this.messagesToRemove.has(index)) {
      this.message.splice(index, 1);
      this.messagesToRemove.delete(index);
    }
  }

  closeMessage(message: Message) {
    const index = this.message.indexOf(message);
    if (index !== -1) {
      this.messagesToRemove.add(index);
    }
  }
}
