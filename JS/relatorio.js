import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

let visitantes = [];

async function carregarVisitantes() {
  const tabela = document.querySelector("#tabelaVisitantes tbody");
  tabela.innerHTML = "";
  visitantes = [];

  const snapshot = await getDocs(collection(db, "visitantes"));

  snapshot.forEach((doc) => {
    const v = doc.data();
    visitantes.push({
      Nome: v.nome,
      CPF: v.cpf,
      Nascimento: v.nascimento,
      Casa: v.casa,
      Entrada: v.entrada.toDate().toLocaleString(),
      CadastradoPor: v.cadastradoPorNome || "—"
    });

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.nome}</td>
      <td>${v.cpf}</td>
      <td>${v.nascimento}</td>
      <td>${v.casa}</td>
      <td>${v.entrada.toDate().toLocaleString()}</td>
      <td>${v.cadastradoPorNome || "—"}</td>
    `;
    tabela.appendChild(tr);
  });
}

window.exportarExcel = function () {
  const worksheet = XLSX.utils.json_to_sheet(visitantes);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Visitantes");
  XLSX.writeFile(workbook, "visitantes.xlsx");
};

window.addEventListener("load", carregarVisitantes);
