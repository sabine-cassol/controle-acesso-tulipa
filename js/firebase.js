import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaAAFw9yu9L4nav0PcSuISnxtVwJSvN8s",
  authDomain: "controleacessocondominio-c6b48.firebaseapp.com",
  projectId: "controleacessocondominio-c6b48",
  storageBucket: "controleacessocondominio-c6b48.appspot.com",
  messagingSenderId: "23447173971",
  appId: "1:23447173971:web:d34e67df0cc1bfe18c7fa6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
