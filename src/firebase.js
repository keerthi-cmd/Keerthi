import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA1NNRS8efyTu3o8IzR37_Prisv2H854Hg",
  authDomain: "todoapp-9bfe9.firebaseapp.com",
  databaseURL: "https://todoapp-9bfe9-default-rtdb.firebaseio.com",
  projectId: "todoapp-9bfe9",
  storageBucket: "todoapp-9bfe9.appspot.com",
  messagingSenderId: "812889526825",
  appId: "1:812889526825:web:a40c4e62e9b37f14bd4238"
};
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}