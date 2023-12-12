async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/alunos/listarTodos");

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
  console.log(dados)

  if (dados && dados.length > 0) {
      const tableBody = document.querySelector('#tabelaAlunos tbody');
      tableBody.innerHTML = '';

      dados.forEach(aluno => {
          const newRow = tableBody.insertRow();

          const nomeCell = newRow.insertCell(0);
          const nomeLink = document.createElement('a');
          nomeLink.href = `../Notas/notas.html?alunoNome=${encodeURIComponent(aluno.nome)}`;
          nomeLink.textContent = aluno.nome;
          nomeCell.appendChild(nomeLink);

          // const escolaCell = newRow.insertCell(1);
          // escolaCell.textContent = aluno.escola;

          // const turmaCell = newRow.insertCell(2);
          // turmaCell.textContent = aluno.turma;

          const idCell = newRow.insertCell(1);
          idCell.textContent = aluno.id;
      });
  }
}

populateTable();