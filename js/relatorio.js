import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tabela = document.querySelector("#tabelaVisitantes tbody");

let dadosExcel = [];

// 🔄 Carrega dados ao abrir a página
window.addEventListener("load", carregarRelatorio);

async function carregarRelatorio() {
  tabela.innerHTML = "";
  dadosExcel = [];

  const q = query(collection(db, "visitantes"), orderBy("entrada", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const v = doc.data();

    const dataEntrada = v.entrada?.toDate
      ? v.entrada.toDate().toLocaleString("pt-BR")
      : "";

    // Linha da tabela
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.nome || ""}</td>
      <td>${v.cpf || ""}</td>
      <td>${v.nascimento || ""}</td>
      <td>${v.casa || ""}</td>

      <td>${v.tipoVeiculo || "Não informado"}</td>
      <td>${v.marcaModelo || "Não informado"}</td>
      <td>${v.corVeiculo || "Não informado"}</td>
      <td>${v.placaVeiculo || "Não informado"}</td>

      <td>${dataEntrada}</td>
      <td>${v.cadastradoPorNome || ""}</td>
    `;

    tabela.appendChild(tr);

    // Dados para Excel
    dadosExcel.push({
      Nome: v.nome || "",
      CPF: v.cpf || "",
      Nascimento: v.nascimento || "",
      Casa: v.casa || "",

      "Tipo Veículo": v.tipoVeiculo || "Não informado",
      "Marca / Modelo": v.marcaModelo || "Não informado",
      Cor: v.corVeiculo || "Não informado",
      Placa: v.placaVeiculo || "Não informado",

      Entrada: dataEntrada,
      "Cadastrado por": v.cadastradoPorNome || ""
    });
  });
}

// 📊 Exportação Excel
window.exportarExcel = function () {
  const ws = XLSX.utils.json_to_sheet(dadosExcel);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Visitantes");

  XLSX.writeFile(wb, "relatorio_visitantes.xlsx");
};
