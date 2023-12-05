import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCWgqUpTTpO9Hmz2Ap2k6Z1E_lVPxcE00",
  authDomain: "res-pas.firebaseapp.com",
  projectId: "res-pas",
  storageBucket: "res-pas.appspot.com",
  messagingSenderId: "252527428185",
  appId: "1:252527428185:web:f70147042d334babb5e748",
  measurementId: "G-E732L2KLBH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
