import { collection, addDoc, Timestamp, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { auth, db } from "./firebase.js";

window.salvarVisitante = async function () {
  const nome = document.getElementById("nome").value;
  const nascimento = document.getElementById("nascimento").value;
  const cpf = document.getElementById("cpf").value;
  const casa = document.getElementById("casa").value;

  if (!nome || !cpf || !casa) {
    alert("Preencha os campos obrigatórios");
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    alert("Usuário não autenticado");
    return;
  }

  // Busca dados do usuário logado
  const refUsuario = doc(db, "usuarios", user.uid);
  const snapUsuario = await getDoc(refUsuario);

  const dadosUsuario = snapUsuario.exists()
    ? snapUsuario.data()
    : { nome: "Desconhecido" };

  await addDoc(collection(db, "visitantes"), {
    nome,
    nascimento,
    cpf,
    casa,
    entrada: Timestamp.now(),
    cadastradoPorUid: user.uid,
    cadastradoPorNome: dadosUsuario.nome
  });

  alert("Visitante cadastrado com sucesso!");

  document.getElementById("nome").value = "";
  document.getElementById("nascimento").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("casa").value = "";
};
