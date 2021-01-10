import  firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyD-A54sdBUeuRZDUI6Sa9GjU7juxqShTgM",
    authDomain: "social-app-android-70660.firebaseapp.com",
    projectId: "social-app-android-70660",
    storageBucket: "social-app-android-70660.appspot.com",
    messagingSenderId: "534038548599",
    appId: "1:534038548599:web:73a674623520685e733672",
    measurementId: "G-9MHRHGBEJ1"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default db;