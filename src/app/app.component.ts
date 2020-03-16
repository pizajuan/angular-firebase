import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessagingService } from './service/messaging.service';
import { StorageService } from './service/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'firebase-test-app';
  message = 'No hay mensajes';

  products = [];

  // products = [
  //   {
  //     "quantity": 308,
  //     "price": "$8,958",
  //     "availability": false,
  //     "name": "aute",
  //     "id": "58b5a5b1b6b6c7aacc25b3fb"
  //   },
  //   {
  //     "quantity": 2,
  //     "price": "$5,450",
  //     "availability": true,
  //     "name": "mollit",
  //     "id": "58b5a5b117bf36cf8aed54ab"
  //   },
  //   {
  //     "quantity": 698,
  //     "price": "$17,001",
  //     "availability": false,
  //     "name": "eiusmod",
  //     "id": "58b5a5b18607b1071fb5ab5b"
  //   },
  //   {
  //     "quantity": 449,
  //     "price": "$6,864",
  //     "availability": true,
  //     "name": "proident",
  //     "id": "58b5a5b13881e97291384813"
  //   },
  //   {
  //     "quantity": 736,
  //     "price": "$13,253",
  //     "availability": false,
  //     "name": "laboris",
  //     "id": "58b5a5b1b82dc20c7dd52260"
  //   },
  //   {
  //     "quantity": 850,
  //     "price": "$10,930",
  //     "availability": false,
  //     "name": "anim",
  //     "id": "58b5a5b1996384dbbc556718"
  //   },
  //   {
  //     "quantity": 644,
  //     "price": "$16,972",
  //     "availability": true,
  //     "name": "duis",
  //     "id": "58b5a5b17326875fe21aebc1"
  //   },
  //   {
  //     "quantity": 722,
  //     "price": "$6,904",
  //     "availability": true,
  //     "name": "sunt",
  //     "id": "58b5a5b1ac8306b5d1d3d5fd"
  //   },
  //   {
  //     "quantity": 620,
  //     "price": "$13,813",
  //     "availability": true,
  //     "name": "reprehenderit",
  //     "id": "58b5a5b1f9ebd51b88636467"
  //   },
  //   {
  //     "quantity": 297,
  //     "price": "$14,552",
  //     "availability": true,
  //     "name": "non",
  //     "id": "58b5a5b1a20b39205ba99c50"
  //   },
  //   {
  //     "quantity": 514,
  //     "price": "$11,042",
  //     "availability": false,
  //     "name": "dolor",
  //     "id": "58b5a5b11f741600608205ca"
  //   },
  //   {
  //     "quantity": 887,
  //     "price": "$17,532",
  //     "availability": true,
  //     "name": "dolor",
  //     "id": "58b5a5b1ef62cb996bb87c45"
  //   },
  //   {
  //     "quantity": 202,
  //     "price": "$6,174",
  //     "availability": true,
  //     "name": "enim",
  //     "id": "58b5a5b1a089200683925a83"
  //   },
  //   {
  //     "quantity": 700,
  //     "price": "$1,904",
  //     "availability": false,
  //     "name": "ad",
  //     "id": "58b5a5b12d7859f999ecccf1"
  //   },
  //   {
  //     "quantity": 343,
  //     "price": "$14,388",
  //     "availability": false,
  //     "name": "ullamco",
  //     "id": "58b5a5b1563189cbccc9adc7"
  //   },
  //   {
  //     "quantity": 435,
  //     "price": "$6,809",
  //     "availability": false,
  //     "name": "mollit",
  //     "id": "58b5a5b18f0d9e833ed59bcd"
  //   },
  //   {
  //     "quantity": 104,
  //     "price": "$9,341",
  //     "availability": true,
  //     "name": "aute",
  //     "id": "58b5a5b18041ec3e1f95de07"
  //   }
  // ];



  constructor(
    private messagingService: MessagingService,
    private ref: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();

    this.messagingService.currentMessage.subscribe(val => {
      console.log('subscribe: ', val);
      if (val) {
        this.message = val.data;
      }
      this.ref.detectChanges();
    });

    this.storageService
      .getProducts()
      .subscribe(res => {
        this.products = res.map( product => product.payload.doc.data());
      });
  }
}
