var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import firebase from 'firebase';
import 'firebase/firestore';
let db;
const initialDB = () => {
    db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
};
export const getUserData = () => __awaiter(this, void 0, void 0, function* () {
    initialDB();
    const result = yield db.collection('user').get();
    return result;
    // .then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // });
});
//# sourceMappingURL=index.js.map