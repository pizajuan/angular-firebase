
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private newMessage: Subject<any> = new Subject();

  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging._next = (payload: any) => {
            console.log(payload);
            this.currentMessage.next(payload);
        };
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
    this.angularFireMessaging.messages.subscribe(
      (messages: any) => {
        console.log(messages);
      }
    );
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        //dzF-F3NSgQGXzXI6npO_Q6:APA91bFOd3do4ZfTVyp-nTsrAEauPk1uxbO01z5cJzaY3ps8CLjvDP5lNDesp76hRB3dh_wAPlFVq1gLH0Xls_XeNbZPnbOruWWApw8mQELvf5jc1_xm2XN_swFPJNZXz9Xow79m-huf
        console.log('registrationToken: ', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    console.log('receiveMessage');
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      });
  }

  _setMessage(msg: any) {
    this.newMessage.next(msg);
  }

  listenMessage(): Observable<any> {
    return this.newMessage.asObservable();
  }
}
