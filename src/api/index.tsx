import firebase from 'firebase';
import 'firebase/firestore';

let db;
const initialDB = () => {
  db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);
};

export const getUserData = async () => {
  initialDB();
  const result = await db.collection('user').get();

  return result;
  // .then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // });
};
