import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ==============================
   Preenche data/hora automaticamente
================================ */
window.addEventListener("load", () => {
  const entrada = document.getElementById("entrada");
  if (entrada) {
    entrada.value = new Date().toISOString().slice(0, 16);
  }
});

/* ==============================
   Função global para o botão HTML
================================ */
window.salvarVisitante = async function () {
  try {
    // 📌 Campos do visitante
    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("nascimento").value;
    const cpf = document.getElementById("cpf").value.trim();
    const casa = document.getElementById("casa").value.trim();

    // 🚗 Dados do veículo
    const tipoVeiculo = document.getElementById("tipoVeiculo").value;
    const marcaModelo = document.getElementById("marcaModelo").value.trim();
    const corVeiculo = document.getElementById("corVeiculo").value.trim();
    const placaVeiculo = document.getElementById("placaVeiculo").value.trim();

    // ✅ Validação básica
    if (!nome || !cpf || !casa) {
      alert("Preencha os campos obrigatórios (Nome, CPF e Casa)");
      return;
    }

    // 🔐 Usuário autenticado
    const user = auth.currentUser;
    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    // 👤 Busca dados do usuário no Firestore
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
      tipoVeiculo,
      marcaModelo,
      corVeiculo,
      placaVeiculo,
      entrada: Timestamp.now(), // horário oficial do servidor
      cadastradoPorNome,
      cadastradoPorCPF
    });

    alert("✅ Visitante cadastrado com sucesso!");

    // 🧹 Limpa formulário
    document.getElementById("nome").value = "";
    document.getElementById("nascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("casa").value = "";
    document.getElementById("tipoVeiculo").value = "";
    document.getElementById("marcaModelo").value = "";
    document.getElementById("corVeiculo").value = "";
    document.getElementById("placaVeiculo").value = "";

    // ⏱ Atualiza horário novamente
    document.getElementById("entrada").value =
      new Date().toISOString().slice(0, 16);

  } catch (error) {
    console.error("Erro ao cadastrar visitante:", error);
    alert("❌ Erro ao cadastrar visitante");
  }
};
