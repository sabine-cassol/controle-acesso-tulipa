import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("btnLogin")?.addEventListener("click", login);

function login() {
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  if (!cpf || !senha) {
    alert("Preencha CPF e senha");
    return;
  }

  const email = cpf + "@tulipa.com";

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(error => {
      console.error(error);
      alert("Erro ao fazer login");
    });
}


