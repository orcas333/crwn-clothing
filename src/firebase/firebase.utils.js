import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAKqHtyysvCVMNgl3GNLnnXslq7B21wVm4",
  authDomain: "crwn-db-1dc91.firebaseapp.com",
  databaseURL: "https://crwn-db-1dc91.firebaseio.com",
  projectId: "crwn-db-1dc91",
  storageBucket: "crwn-db-1dc91.appspot.com",
  messagingSenderId: "28048035536",
  appId: "1:28048035536:web:84200a44eda0aa6ef798d5",
  measurementId: "G-M1F7FCDXF3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
