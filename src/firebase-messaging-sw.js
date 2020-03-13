importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCsR5RMIgR3ESaIRoGT1St7rnB_yvzcnHU",
    authDomain: "test-teekit.firebaseapp.com",
    databaseURL: "https://test-teekit.firebaseio.com",
    projectId: "test-teekit",
    storageBucket: "test-teekit.appspot.com",
    messagingSenderId: "345869647743",
    appId: "1:345869647743:web:6b9f61cb73948bcdc3244a",
    measurementId: "G-ZY958R1QBP"
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    // TODO: al ser un mensaje de background lo debemos tomar aqui y hacer algo

    //para mostrar la notificacion
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});