// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurações do Firebase - Projeto redacaoSmrt
const firebaseConfig = {
    apiKey: "AIzaSyAcXPZUBkrt2gDizqdsPop0jC04fN7h2w4",
    authDomain: "redacaosmrt.firebaseapp.com",
    databaseURL: "https://redacaosmrt-default-rtdb.firebaseio.com",
    projectId: "redacaosmrt",
    storageBucket: "redacaosmrt.firebasestorage.app",
    messagingSenderId: "169731858034",
    appId: "1:169731858034:web:40345b06f0abf4f5426ceb",
    measurementId: "G-GWD58ZQEEG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
