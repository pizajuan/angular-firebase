import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessagingService } from './service/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'firebase-test-app';
  message = 'No hay mensajes';
  constructor(
    private messagingService: MessagingService,
    private ref: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();

    this.messagingService.currentMessage.subscribe( val => {
      console.log('subscribe: ', val);
      if (val) {
        this.message = val.data;
      }
      this.ref.detectChanges();
    });
  }
}
