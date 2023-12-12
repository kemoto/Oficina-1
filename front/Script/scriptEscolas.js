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

async function GetUserById(id) {
  try {
      const response = await fetch(`http://localhost:3000/escolas/${id}`);
      if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data)

      return data;
  } catch (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
  }
}

async function populateTable() {
  const dados = await getUsers();
  let cont = 0; 

  // console.log(dados[0].id);

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
      editButton.addEventListener('click', () => GetUserById(dados[cont].id));
      editButton.appendChild(imageButton);
      editCell.appendChild(editButton);

      cont++;
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
