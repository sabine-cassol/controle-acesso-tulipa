import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Preenche data/hora automaticamente ao abrir a página
window.addEventListener("load", () => {
  const entrada = document.getElementById("entrada");
  const agora = new Date();
  entrada.value = agora.toISOString().slice(0, 16);
});

window.salvarVisitante = async function () {
  try {
    // 🔹 DADOS DO VISITANTE
    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value || null;
    const cpf = document.getElementById("cpf").value.trim();
    const casa = document.getElementById("casa").value.trim();

    // 🔹 DADOS DO VEÍCULO (NOVOS)
    const tipoVeiculo = document.getElementById("tipoVeiculo").value || "Não informado";
    const marcaModelo = document.getElementById("marcaModelo").value.trim() || "Não informado";
    const corVeiculo = document.getElementById("corVeiculo").value.trim() || "Não informado";
    const placaVeiculo = document.getElementById("placaVeiculo").value.trim() || "Não informado";

    // Validação mínima
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

    // 💾 Salva visitante no Firestore
    await addDoc(collection(db, "visitantes"), {
      nome,
      nascimento,
      cpf,
      casa,

      // Veículo
      tipoVeiculo,
      marcaModelo,
      corVeiculo,
      placaVeiculo,

      // Controle
      entrada: Timestamp.now(),
      cadastradoPorNome,
      cadastradoPorCPF,
      cadastradoPorUid: user.uid
    });

    alert("Visitante cadastrado com sucesso!");

    // 🔄 Limpa formulário
    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("casa").value = "";

    document.getElementById("tipoVeiculo").value = "";
    document.getElementById("marcaModelo").value = "";
    document.getElementById("corVeiculo").value = "";
    document.getElementById("placaVeiculo").value = "";

    // Atualiza hora novamente
    document.getElementById("entrada").value =
      new Date().toISOString().slice(0, 16);

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar visitante");
  }
};
