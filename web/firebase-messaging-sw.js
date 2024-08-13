importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyBSQK2deEu3UeR9g3-8gkEMakwoTuKcmMg",
    authDomain: "fastfood-76dc2.firebaseapp.com",
    databaseURL: "https://fastfood-76dc2-default-rtdb.firebaseio.com",
    projectId: "fastfood-76dc2",
    storageBucket: "fastfood-76dc2.appspot.com",
    messagingSenderId: "110606658147",
    appId: "1:110606658147:web:5a4b5477235be324f8e656",
    measurementId: "G-PYQ7BQ96LP"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});