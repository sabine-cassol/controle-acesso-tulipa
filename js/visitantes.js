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
    if (!nome || !cpf |
