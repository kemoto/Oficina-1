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
    const response = await fetch(`http://localhost:3000/alunos/${alunoId}`);

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
      console.log("String JSON antes do parse:", materia.notas);

      const newRow = tableBody.insertRow();

      const nomeMateriaCell = newRow.insertCell(0);
      nomeMateriaCell.textContent = materia.nomeMateria;

      const notasArray = JSON.parse(`[${materia.notas}]`|| "0");
      console.log("Array de objetos após o parse:", notasArray);
    // Adiciona as notas nas células subsequentes (colunas 1 a 4)
    for (let i = 1; i <= 4; i++) {
      const notaCell = newRow.insertCell(i);

      // Verifica se há uma nota disponível para o bimestre atual
      const notaDoBimestre = notasArray.find(nota => nota.bimestre === i);
      if (notaDoBimestre) {
        notaCell.textContent = notaDoBimestre.nota;
      } else {
        notaCell.textContent = 'N/A'; // Ou qualquer valor padrão para notas ausentes
      }
    }

      const editCell = newRow.insertCell(5);
      var imagem = document.createElement("img");
      imagem.src = "../imagens/Editor2.png";
      imagem.style.float = "right";
      editCell.appendChild(imagem);
    });
  }
}

populateTable();

function adicionarNota() {
  const nomeMateria = document.getElementById("nomeMateria").value;
  const nota1 = document.getElementById("nota1").value;
  const nota2 = document.getElementById("nota2").value;
  const nota3 = document.getElementById("nota3").value;
  const nota4 = document.getElementById("nota4").value;

  const novaMateria = {
    nomeMateria: nomeMateria,
    nota1: nota1,
    nota2: nota2,
    nota3: nota3,
    nota4: nota4,
  };

  dados.push(novaMateria);

  populateTable(dados);

  fecharModal();
}

function fecharModal() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function mostrarModal() {
  document.getElementById("nomeMateria").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("nota3").value = "";
  document.getElementById("nota4").value = "";
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}
