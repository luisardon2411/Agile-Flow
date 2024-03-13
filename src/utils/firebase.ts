import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBF1_PwNtThfk3XjUXqawAOme08XpbTYw",
    authDomain: "agile-flow.firebaseapp.com",
    projectId: "agile-flow",
    storageBucket: "agile-flow.appspot.com",
    messagingSenderId: "1032104937066",
    appId: "1:1032104937066:web:a5ff138221b4d7e51dac13"
};

export const initFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(initFirebase);
export const provider = new GoogleAuthProvider();
const db = initializeFirestore(initFirebase, { localCache: memoryLocalCache() });


export { db }