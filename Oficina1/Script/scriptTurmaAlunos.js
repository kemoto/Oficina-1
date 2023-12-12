function populateTable(dados) {
    const tableBody = document.querySelector('#tabelaAlunos tbody');
    tableBody.innerHTML = '';

    if (dados && dados.length > 0) {
        dados.forEach(aluno => {
            const newRow = tableBody.insertRow();

            const nomeCell = newRow.insertCell(0);
            const alunoLink = document.createElement('a');
            alunoLink.href = '../Notas/notas.html';
            alunoLink.textContent = aluno.nome;
            nomeCell.appendChild(alunoLink);

            const idCell = newRow.insertCell(1);
            idCell.textContent = aluno.id;

            const editCell = newRow.insertCell(2);
            var imagem = document.createElement('img');
            imagem.src = '../imagens/Editor2.png';
            imagem.style.float = 'right';   
            editCell.appendChild(imagem);
        });
    }
}
const dados = [
    {
        nome: 'Aluno 1',
        id: '1'
    },
    {
        nome: 'Aluno 2',
        id: '2'
    },
    {
        nome: 'Aluno 3',
        id: '3'
    },
    {
        nome: 'Aluno 4',
        id: '4'
    },
    {
        nome: 'Aluno 5',
        id: '5'
    },
    {
        nome: 'Aluno 6',
        id: '6'
    },
    {
        nome: 'Aluno 7',
        id: '7'
    },
    {
        nome: 'Aluno 8',
        id: '8'
    },
    {
        nome: 'Aluno 9',
        id: '9'
    },
    {
        nome: 'Aluno 10',
        id: '10'
    },
    {
        nome: 'Aluno 11',
        id: '11'
    },
    {
        nome: 'Aluno 12',
        id: '12'
    },
    {
        nome: 'Aluno 13',
        id: '13'
    },
    {
        nome: 'Aluno 14',
        id: '14'
    },
    {
        nome: 'Aluno 15',
        id: '15'
    },
    {
        nome: 'Aluno 16',
        id: '16'
    },
    {
        nome: 'Aluno 17',
        id: '17'
    },
    {
        nome: 'Aluno 18',
        id: '18'
    }
];

populateTable(dados);

function adicionarEscola() {
    const nomeAluno = document.getElementById('nomeAluno').value;
    const idAluno = document.getElementById('idAluno').value;

    const novoAluno = {
        nome: nomeAluno,
        id: idAluno,
    };

    dados.push(novoAluno); 

    populateTable(dados);

    fecharModal(); 
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function mostrarModal() {
    document.getElementById('nomeAluno').value = '';
    document.getElementById('idAluno').value = '';
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}