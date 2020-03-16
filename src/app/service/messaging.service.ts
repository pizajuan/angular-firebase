
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private newMessage: Subject<any> = new Subject();
  tokensApps: any;
  currentToken: string;

  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private storageService: StorageService
    ) {

    this.storageService
      .getTokensApps()
      .subscribe(res => {
        this.tokensApps = res;
        this.checkToken();
      });

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

    // setTimeout(() => { this.getTokens(); }, 5000);
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      async (token) => {
        //dzF-F3NSgQGXzXI6npO_Q6:APA91bFOd3do4ZfTVyp-nTsrAEauPk1uxbO01z5cJzaY3ps8CLjvDP5lNDesp76hRB3dh_wAPlFVq1gLH0Xls_XeNbZPnbOruWWApw8mQELvf5jc1_xm2XN_swFPJNZXz9Xow79m-huf
        // console.log('registrationToken: ', token);
        this.currentToken = token;
        // await this.storageService.createToken({'tokenId': token});
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

  getTokens() {
    this.tokensApps.forEach(token => {
      console.log(token.payload.doc.data());
    });
  }

  async checkToken() {
    // this.currentToken = '1234'; // HARDCODE
    const response = this.tokensApps.find(token => this.currentToken === token.payload.doc.data().tokenId);
    if (response === undefined) {
      console.log('se debe agregar a base de datos');
      try {
        const res = await this.storageService.createToken({tokenId : this.currentToken});
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('token existe en fire db: ', response.payload.doc.data().tokenId);
    }

  }
}
