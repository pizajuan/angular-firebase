import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // https://dottedsquirrel.com/angular/how-to-crud-in-angular-firebase-firestore/
  // Actualmente hacemos llamadas a la base de datos de firebase desde front esto en produccion debe cambiar al backend
  constructor(private firestore: AngularFirestore) { }

  // createToken
  async createToken(data) {
    // return await ((resolve, reject) => {
    //   this.firestore
    //     .collection('tokensClientApps')
    //     .add(data);
    //     // .then(res => { }, err => reject(err));
    return await this.firestore.collection('tokensClientApps').add(data);
  }

  // get tokens
  getTokensApps() {
    return this.firestore.collection('tokensClientApps').snapshotChanges();
  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }
}
