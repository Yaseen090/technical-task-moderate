// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzbcjeYoOWDOdq2ciN_oPM8swGYv58IEo",
  authDomain: "fir-test-dc727.firebaseapp.com",
  projectId: "fir-test-dc727",
  storageBucket: "fir-test-dc727.appspot.com",
  messagingSenderId: "643048631685",
  appId: "1:643048631685:web:8cdef2ec7a427ceee1a8ec",
  measurementId: "G-M2KBKYB93W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export default auth

