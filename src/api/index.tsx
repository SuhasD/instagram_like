import firebase from 'firebase';
import 'firebase/firestore';

let db;
const initialDB = () => { // function to initial your data-base in firebase
  db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);
};

export const getUserData = async () => { // get main info from user profile
  initialDB();
  const result = await db.collection('user').get();

  return result;
};

export const getUserImgs = async () => { // get all user image
  initialDB();
  const result = await db.collection('userImgs').get();

  return result;
};

export const updateNameAndAvatar = async ({id, name, avatar}: {id: any, name: string, avatar: any}) => { // update user profile info
  if (name) {
    await db.collection('user').doc(id).update({
      name
    });
  } else {
    await db.collection('user').doc(id).update({
      avatar
    });
  }
};

export const updateImageCollection = async ({imgs}: {imgs: any}) => { // add new image to collection
  await db.collection('userImgs').add({
    imgs
  });
  return 'end';
};
