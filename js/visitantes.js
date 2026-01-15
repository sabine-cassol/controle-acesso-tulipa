import { collection, addDoc, Timestamp, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth } from "./firebase.js";

// Preenche data/hora automaticamente ao abrir a página
window.addEventListener("load", () => {
  const entrada = document.getElementById("entrada");
  const agora = new Date();
  entrada.value = agora.toISOString().slice(0,16);
});

window.salvarVisitante = async function () {
  try {
    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("nascimento").value;
    const cpf = document.getElementById("cpf").value;
    const casa = document.getElementById("casa").value;

    if (!nome || !cpf || !casa) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    // 🔐 Usuário logado
    const user = auth.currentUser;

    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    // 🔎 Busca dados do usuário no Firestore
    const usuarioRef = doc(db, "usuarios", user.uid);
    const usuarioSnap = await getDoc(usuarioRef);

    let cadastradoPorNome = "Desconhecido";
    let cadastradoPorCPF = "";

    if (usuarioSnap.exists()) {
      const dados = usuarioSnap.data();
      cadastradoPorNome = dados.nome || "Desconhecido";
      cadastradoPorCPF = dados.cpf || "";
    }

    // 💾 Salva visitante
    await addDoc(collection(db, "visitantes"), {
      nome,
      nascimento,
      cpf,
      casa,
      entrada: Timestamp.now(), // data/hora oficial do servidor
      cadastradoPorNome,
      cadastradoPorCPF
    });

    alert("Visitante cadastrado com sucesso!");

    // Limpa formulário
    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("casa").value = "";

    // Atualiza hora novamente
    document.getElementById("entrada").value =
      new Date().toISOString().slice(0,16);

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar visitante");
  }
};


