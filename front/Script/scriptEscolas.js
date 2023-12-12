async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/escolas/listar");

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
    const tableBody = document.querySelector("#tabelaEscolas tbody");
    tableBody.innerHTML = "";

    dados.forEach((escola) => {
      const newRow = tableBody.insertRow();

      const nomeCell = newRow.insertCell(0);
      const nomeLink = document.createElement("a");
      nomeLink.href = "../Turmas/turmas.html";
      nomeLink.textContent = escola.nome;
      nomeCell.appendChild(nomeLink);

      const enderecoCell = newRow.insertCell(1);
      enderecoCell.textContent = escola.endereco;

      const contatoCell = newRow.insertCell(2);
      contatoCell.textContent = escola.contato;

      const editCell = newRow.insertCell(3);
      let editButton = document.createElement("button");
      let imageButton = document.createElement("img");
      imageButton.src = "../imagens/Editor2.png";
      imageButton.style.float = "right";
      editButton.addEventListener("click", () => updateMostrarModal(escola));
      editButton.appendChild(imageButton);
      editCell.appendChild(editButton);
    });
  }
}
populateTable();

async function adicionarEscola() {
  const nomeEscola = document.getElementById("nomeEscola").value;
  const enderecoEscola = document.getElementById("enderecoEscola").value;
  const contatoEscola = document.getElementById("contatoEscola").value;

  try {
    const response = await fetch("http://localhost:3000/escolas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeEscola,
        endereco: enderecoEscola,
        contato: contatoEscola,
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
  document.getElementById("nomeEscola").value = "";
  document.getElementById("enderecoEscola").value = "";
  document.getElementById("contatoEscola").value = "";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

async function updateMostrarModal(escola) {
  escolaid = escola.id;
  document.getElementById("nomeEscolaUpdate").value = escola.nome;
  document.getElementById("enderecoEscolaUpdate").value = escola.endereco;
  document.getElementById("contatoEscolaUpdate").value = escola.contato;
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
  const nome = document.getElementById("nomeEscolaUpdate").value;
  const endereco = document.getElementById("enderecoEscolaUpdate").value;
  const contato = document.getElementById("contatoEscolaUpdate").value;

  try {
    const response = await fetch(`http://localhost:3000/escolas/${escolaid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        endereco,
        contato,
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