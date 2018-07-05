import App from './build/App';
import * as firebase from 'firebase';

export default App;


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJIAXd55Xlu6u4Mw7K_cDh8tIiIBYoWlk",
  authDomain: "insta-like-b341d.firebaseapp.com",
  databaseURL: "https://insta-like-b341d.firebaseio.com",
  projectId: "insta-like-b341d",
  storageBucket: "insta-like-b341d.appspot.com",
  messagingSenderId: "173304192663"
};

firebase.initializeApp(firebaseConfig);
