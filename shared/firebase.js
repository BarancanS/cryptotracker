import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC8nEGZ81meORwCrO7k6nR78ngEIj5alrE",
  authDomain: "cryptotracker-fa5a8.firebaseapp.com",
  projectId: "cryptotracker-fa5a8",
  storageBucket: "cryptotracker-fa5a8.appspot.com",
  messagingSenderId: "357399718559",
  appId: "1:357399718559:web:30b0e80ea8d84b0bc7d0aa",
  measurementId: "G-5GWYHNGBLM",
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        List: [],
        uid: user.uid,
        name: user.displayName || "", // Ensure name is not empty
        authProvider: "google",
        email: user.email || "", // Ensure email is not empty
        isAdmin: false,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      List: [],
      uid: user.uid,
      name,
      authProvider: "email",
      email,
      isAdmin: false,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  onSnapshot,
};
