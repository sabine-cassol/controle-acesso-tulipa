import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("btnLogin")?.addEventListener("click", login);

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(error => {
      alert("Erro ao fazer login: " + error.message);
    });
}
