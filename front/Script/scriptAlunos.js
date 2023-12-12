function populateTable(dados) {
    if (dados && dados.length > 0) {
        const tableBody = document.querySelector('#tabelaAlunos tbody');
        tableBody.innerHTML = '';

        dados.forEach(aluno => {
            const newRow = tableBody.insertRow();

            const nomeCell = newRow.insertCell(0);
            const nomeLink = document.createElement('a');
            nomeLink.href = '../Notas/notas.html'; 
            nomeLink.textContent = aluno.nome;
            nomeCell.appendChild(nomeLink);

            const escolaCell = newRow.insertCell(1);
            escolaCell.textContent = aluno.escola;

            const turmaCell = newRow.insertCell(2);
            turmaCell.textContent = aluno.turma;

            const idCell = newRow.insertCell(3);
            idCell.textContent = aluno.id;
        });
    }
}

const dados = [
    {
        nome: 'Aluno 1',
        escola: 'Escola 1',
        turma: 'Turma A',
        id: '1'
    },
    {
        nome: 'Aluno 2',
        escola: 'Escola 2',
        turma: 'Turma B',
        id: '2'
    },
    {
        nome: 'Aluno 3',
        escola: 'Escola 3',
        turma: 'Turma C',
        id: '3'
    },
    {
        nome: 'Aluno 4',
        escola: 'Escola 4',
        turma: 'Turma D',
        id: '4'
    },
    {
        nome: 'Aluno 5',
        escola: 'Escola 5',
        turma: 'Turma E',
        id: '5'
    },
    {
        nome: 'Aluno 6',
        escola: 'Escola 6',
        turma: 'Turma F',
        id: '6'
    },
    {
        nome: 'Aluno 7',
        escola: 'Escola 7',
        turma: 'Turma G',
        id: '7'
    },
    {
        nome: 'Aluno 8',
        escola: 'Escola 8',
        turma: 'Turma H',
        id: '8'
    },
    {
        nome: 'Aluno 9',
        escola: 'Escola 9',
        turma: 'Turma I',
        id: '9'
    },
    {
        nome: 'Aluno 10',
        escola: 'Escola 10',
        turma: 'Turma J',
        id: '10'
    },
    {
        nome: 'Aluno 11',
        escola: 'Escola 11',
        turma: 'Turma K',
        id: '11'
    },
    {
        nome: 'Aluno 12',
        escola: 'Escola 12',
        turma: 'Turma L',
        id: '12'
    },
    {
        nome: 'Aluno 13',
        escola: 'Escola 13',
        turma: 'Turma M',
        id: '13'
    },
    {
        nome: 'Aluno 14',
        escola: 'Escola 14',
        turma: 'Turma N',
        id: '14'
    }
];

populateTable(dados);