// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // For authentication
import { getFirestore } from 'firebase/firestore';  // For Firestore DB

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo2LiTx-EX3E_vkNPesQ5H3Q2OaXG-50k",
  projectId: "miniloa-n",
  storageBucket: "miniloa-n.appspot.com",
  appId: "1:917555913136:android:fdffb9faa8283b4f68b675",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
