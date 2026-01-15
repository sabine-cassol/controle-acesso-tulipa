import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth, db } from "./firebase.js";

window.criarUsuario = async function () {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const funcao = document.getElementById("funcao").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !cpf || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const email = cpf + "@condominio.com";

  const cred = await createUserWithEmailAndPassword(auth, email, senha);

  await addDoc(collection(db, "usuarios"), {
    uid: cred.user.uid,
    nome,
    cpf,
    funcao,
    role: "porteiro"
  });

  alert("Usuário criado!");
};

