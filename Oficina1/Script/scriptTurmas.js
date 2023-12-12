function populateTable(dados) {
    if (dados && dados.length > 0) {
        const tableBody = document.querySelector('#tabelaTurmas tbody');
        tableBody.innerHTML = '';

        dados.forEach(turma => {
            console.log('Nome da turma:', turma.nome);
            const newRow = tableBody.insertRow();
        
            const turmaCell = newRow.insertCell(0);
            const turmaLink = document.createElement('a');
            turmaLink.href = '../TurmaAlunos/turmaalunos.html';
            turmaLink.textContent = turma.nome;
            turmaCell.appendChild(turmaLink);
        
            const editCell = newRow.insertCell(1);
            var imagem = document.createElement('img');
            imagem.src = '../imagens/Editor2.png';
            imagem.style.float = 'right';   
            editCell.appendChild(imagem);
        });
    }
}

const dados = [
    {
        nome: 'Turma A'
    },
    {
        nome: 'Turma B'
    },
    {
        nome: 'Turma C'
    },
    {
        nome: 'Turma D'
    },
    {
        nome: 'Turma E'
    },
    {
        nome: 'Turma F'
    },
    {
        nome: 'Turma G'
    },
    {
        nome: 'Turma H'
    },
    {
        nome: 'Turma I'
    },
    {
        nome: 'Turma J'
    },
    {
        nome: 'Turma K'
    },
    {
        nome: 'Turma L'
    },
    {
        nome: 'Turma M'
    },
    {
        nome: 'Turma N'
    },
    {
        nome: 'Turma O'
    },
    {
        nome: 'Turma P'
    },
    {
        nome: 'Turma Q'
    },
    {
        nome: 'Turma R'
    },
    {
        nome: 'Turma S'
    },
    {
        nome: 'Turma T'
    },
    {
        nome: 'Turma U'
    },
    {
        nome: 'Turma V'
    }
];

populateTable(dados);

function adicionarEscola() {
    const nomeTurma = document.getElementById('nomeTurma').value;

    const novaTurma = {
        nome: nomeTurma,
    };

    dados.push(novaTurma); 

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
    document.getElementById('nomeTurma').value = '';
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}
