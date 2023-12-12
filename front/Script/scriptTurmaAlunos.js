function obterParametroDaURL(nomeParametro) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(nomeParametro);
}

function atualizarTituloTurmas() {
  const nomeTurma = obterParametroDaURL("turmaNome");
  if (nomeTurma) {
      document.querySelector("#cabeca h2").textContent = nomeTurma;
  }
}

atualizarTituloTurmas();

async function getUsers() {
  try {
    const response = await fetch(`http://localhost:3000/alunos/listar?turmaId=${obterParametroDaURL("turmaId")}`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    return [];
  }
}

function handleAlunoClick(event) {
  var alunoId = event.currentTarget.getAttribute("data-aluno-id");

  localStorage.setItem("alunoId", alunoId);

  window.location.href = "notas.html";
}

async function populateTable() {
  const dados = await getUsers();

  const tableBody = document.querySelector("#tabelaAlunos tbody");
  tableBody.innerHTML = "";

  if (dados && dados.length > 0) {
    dados.forEach((aluno) => {
      console.log(aluno)
      const newRow = tableBody.insertRow();

      const nomeCell = newRow.insertCell(0);
      const alunoLink = document.createElement("a");
      alunoLink.setAttribute("data-aluno-id", aluno.id);
      console.log(aluno.id);
      alunoLink.addEventListener("click", handleAlunoClick);
      alunoLink.href = `../Notas/notas.html?alunoNome=${encodeURIComponent(aluno.nome)}&alunoId=${aluno.id}`;
      alunoLink.textContent = aluno.nome;
      nomeCell.appendChild(alunoLink);

      const idCell = newRow.insertCell(1);
      idCell.textContent = aluno.id;

      const editCell = newRow.insertCell(2);
      let editButton = document.createElement("button");
      let imageButton = document.createElement("img");
      imageButton.src = "../imagens/Editor2.png";
      imageButton.style.float = "right";
      editButton.addEventListener("click", () => updateMostrarModal(aluno));
      editButton.appendChild(imageButton);
      editCell.appendChild(editButton);
    });
  }
}

populateTable();

async function adicionarTurmaAluno() {
  const nomeAluno = document.getElementById("nomeAluno").value;

  try {
    const response = await fetch("http://localhost:3000/alunos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeAluno,
        escolaId: obterParametroDaURL("escolaId"),
        turmaId: obterParametroDaURL("turmaId"),
      }),
    });

    if (response.ok) {
      populateTable();
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

function mostrarModal() {
  document.getElementById("nomeAluno").value = "";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

async function updateMostrarModal(aluno) {
  alunoId = aluno.id;
  document.getElementById("nomeTurmaAlunoUpdate").value = aluno.nome;
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("updateMmodal");
  modal.style.display = "block";
}

function fecharModalUpdate() {
  const modal = document.getElementById("updateMmodal");
  modal.style.display = "none";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

async function saveEditedUser() {
  const nome = document.getElementById("nomeTurmaAlunoUpdate").value;

  try {
    const response = await fetch(`http://localhost:3000/alunos/${alunoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
      }),
    });

    if (response.ok) {
      populateTable();
    } else {
      const errorMessage = await response.text();
      console.error("Erro ao editar usuário:", errorMessage);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}
