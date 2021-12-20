// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7MVeSHTj3JxCRJakOxQVsVZil-5VF4BA",
  authDomain: "otp-auth-228bf.firebaseapp.com",
  projectId: "otp-auth-228bf",
  storageBucket: "otp-auth-228bf.appspot.com",
  messagingSenderId: "457857315529",
  appId: "1:457857315529:web:af8bcaefb8b2d9aa69d318"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase