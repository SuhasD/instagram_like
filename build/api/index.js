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
});
export const getUserImgs = () => __awaiter(this, void 0, void 0, function* () {
    initialDB();
    const result = yield db.collection('userImgs').get();
    return result;
});
export const updateNameAndAvatar = ({ id, name, avatar }) => __awaiter(this, void 0, void 0, function* () {
    if (name) {
        yield db.collection('user').doc(id).update({
            name
        });
    }
    else {
        yield db.collection('user').doc(id).update({
            avatar
        });
    }
});
export const updateImageCollection = ({ imgs }) => __awaiter(this, void 0, void 0, function* () {
    yield db.collection('userImgs').add({
        imgs
    });
    return 'end';
});
//# sourceMappingURL=index.js.map