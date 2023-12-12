async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/turmas/listar");

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

async function populateTable() {
  const dados = await getUsers();

  if (dados && dados.length > 0) {
    const tableBody = document.querySelector("#tabelaTurmas tbody");
    tableBody.innerHTML = "";

    dados.forEach((turma) => {
      console.log("Nome da turma:", turma.nome);
      const newRow = tableBody.insertRow();

      const turmaCell = newRow.insertCell(0);
      const turmaLink = document.createElement("a");
      turmaLink.href = "../TurmaAlunos/turmaalunos.html";
      turmaLink.textContent = turma.nome;
      turmaCell.appendChild(turmaLink);

      const editCell = newRow.insertCell(1);
      let editButton = document.createElement("button");
      let imageButton = document.createElement("img");
      imageButton.src = "../imagens/Editor2.png";
      imageButton.style.float = "right";
      editButton.addEventListener("click", () => updateMostrarModal(turma));
      editButton.appendChild(imageButton);
      editCell.appendChild(editButton);
    });
  }
}

populateTable();

async function adicionarTurma() {
  const nomeTurma = document.getElementById("nomeTurma").value;

  try {
    const response = await fetch("http://localhost:3000/turmas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeTurma,
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
  document.getElementById("nomeTurma").value = "";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

async function updateMostrarModal(turma) {
  turmaid = turma.id;
  document.getElementById("nomeTurma").value = turma.nome;
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
  const nome = document.getElementById("nomeTurmaUpdate").value;

  try {
    const response = await fetch(`http://localhost:3000/turmas/${turmaid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
      }),
    });

    console.log(response);

    if (response.ok) {
      populateTable()
    } else {
      const errorMessage = await response.text();
      console.error("Erro ao editar usuário:", errorMessage);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}