import { signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./firebase.js";

window.login = function () {
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  if (!cpf || !senha) {
    alert("Informe CPF e senha");
    return;
  }

  const email = cpf + "@condominio.com";

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(() => {
      alert("CPF ou senha inválidos");
    });
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
