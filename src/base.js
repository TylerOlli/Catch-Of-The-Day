import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDpivoeEYdFX9u-3IgImB_Bfs-ICuRpd3I",
  authDomain: "catch-of-the-day-8e3cf.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-8e3cf.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
