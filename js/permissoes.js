import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./firebase.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const ref = doc(db, "usuarios", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const dados = snap.data();

    if (dados.role !== "admin") {
      const menu = document.getElementById("menuUsuarios");
      if (menu) menu.style.display = "none";
    }
  }
});
