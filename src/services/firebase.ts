// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApyo0McbiqQNm6hdnNVCBPRQHs8_QnDfA",
  authDomain: "projet-web-dev3.firebaseapp.com",
  projectId: "projet-web-dev3",
  storageBucket: "projet-web-dev3.firebasestorage.app",
  messagingSenderId: "601160341154",
  appId: "1:601160341154:web:8e71655a751c0790fba9fb",
  measurementId: "G-GZG8WGVVB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté avec succès");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
