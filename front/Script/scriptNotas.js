function obterParametroDaURL(nomeParametro) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(nomeParametro);
}

function atualizarTituloTurmas() {
  const nomeAluno = obterParametroDaURL("alunoNome");
  if (nomeAluno) {
    document.querySelector("#cabeca h2").textContent = nomeAluno;
  }
}

atualizarTituloTurmas();

async function getUsers() {
  const alunoId = localStorage.getItem("alunoId");

  try {
    const response = await fetch(
      `http://localhost:3000/alunos/?alunoId=${alunoId}`
    );

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

  const tableBody = document.querySelector("#tabelaNotas tbody");
  tableBody.innerHTML = "";

  if (dados && dados.length > 0) {
    dados.forEach((materia) => {
      const newRow = tableBody.insertRow();

      const nomeMateriaCell = newRow.insertCell(0);
      nomeMateriaCell.textContent = materia.nomeMateria;

      const notasArray = JSON.parse(`[${materia.notas}]` || "0");
      for (let i = 1; i <= 4; i++) {
        const notaCell = newRow.insertCell(i);

        const notaDoBimestre = notasArray.find((nota) => nota.bimestre === i);
        if (notaDoBimestre) {
          notaCell.textContent = notaDoBimestre.nota;
        } else {
          notaCell.textContent = "N/A";
        }
      }

      // const editCell = newRow.insertCell(5);
      // let editButton = document.createElement("button");
      // let imageButton = document.createElement("img");
      // imageButton.src = "../imagens/Editor2.png";
      // imageButton.style.float = "right";
      // editButton.addEventListener("click", () => updateMostrarModal(materia.notas));
      // editButton.appendChild(imageButton);
      // editCell.appendChild(editButton);
    });
  }
}

populateTable();

async function adicionarNota() {
  const nomeMateria = document.getElementById("nomeMateria").value;
  const bimestre = document.getElementById("bimestre").value;
  const nota = document.getElementById("nota").value;

  try {
    const response = await fetch("http://localhost:3000/notas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeMateria,
        alunoId: obterParametroDaURL("alunoId"),
        bimestre,
        nota,
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
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function mostrarModal() {
  document.getElementById("nomeMateria").value = "";
  document.getElementById("bimestre").value = "";
  document.getElementById("nota").value = "";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}