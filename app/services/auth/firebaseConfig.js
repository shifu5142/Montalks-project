// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLrPrky4DQvZ0gY9nTCnsLe3azjuj17RQ",
  authDomain: "montalks-e1c12.firebaseapp.com",
  projectId: "montalks-e1c12",
  
  appId: "1:458479153568:web:c0f2344c4da6a3f32974c5",
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);