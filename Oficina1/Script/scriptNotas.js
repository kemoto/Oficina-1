function populateTable(dados) {
    const tableBody = document.querySelector('#tabelaNotas tbody');
    tableBody.innerHTML = '';

    if (dados && dados.length > 0) {
        dados.forEach(materia => {
            const newRow = tableBody.insertRow();

            const nomeMateriaCell = newRow.insertCell(0);
            nomeMateriaCell.textContent = materia.nomeMateria;

            for (let i = 1; i <= 4; i++) {
                const notaCell = newRow.insertCell(i);
                notaCell.textContent = materia['nota' + i];
            }

            const editCell = newRow.insertCell(5);
            var imagem = document.createElement('img');
            imagem.src = '../imagens/Editor2.png';
            imagem.style.float = 'right';   
            editCell.appendChild(imagem);

        });
    }
}

// Exemplo de uso
const dados = [
    {
        nomeMateria: 'Matemática',
        nota1: '8',
        nota2: '7',
        nota3: '9',
        nota4: '10'
    },
    {
        nomeMateria: 'Português',
        nota1: '9',
        nota2: '8',
        nota3: '7',
        nota4: '6'
    },
    {
        nomeMateria: 'Geografia',
        nota1: '10',
        nota2: '9',
        nota3: '8',
        nota4: '7'
    },
    {
        nomeMateria: 'História',
        nota1: '6',
        nota2: '7',
        nota3: '8',
        nota4: '9'
    },
    {
        nomeMateria: 'Inglês',
        nota1: '7',
        nota2: '8',
        nota3: '9',
        nota4: '10'
    },
    {
        nomeMateria: 'Educação Física',
        nota1: '8',
        nota2: '9',
        nota3: '10',
        nota4: '7'
    },
    {
        nomeMateria: 'Artes',
        nota1: '10',
        nota2: '9',
        nota3: '8',
        nota4: '7'
    },
    {
        nomeMateria: 'Ciências',
        nota1: '7',
        nota2: '8',
        nota3: '9',
        nota4: '10'
    },
    {
        nomeMateria: 'Filosofia',
        nota1: '8',
        nota2: '9',
        nota3: '10',
        nota4: '7'
    },
    {
        nomeMateria: 'Sociologia',
        nota1: '10',
        nota2: '9',
        nota3: '8',
        nota4: '7'
    }
];

populateTable(dados);

function adicionarNota() {
    const nomeMateria = document.getElementById('nomeMateria').value;
    const nota1 = document.getElementById('nota1').value;
    const nota2 = document.getElementById('nota2').value;
    const nota3 = document.getElementById('nota3').value;
    const nota4 = document.getElementById('nota4').value;

    const novaMateria = {
        nomeMateria: nomeMateria,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        nota4: nota4
    };

    dados.push(novaMateria);

    populateTable(dados);

    fecharModal();
}

function fecharModal() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function mostrarModal() {
    document.getElementById('nomeMateria').value = '';
    document.getElementById('nota1').value = '';
    document.getElementById('nota2').value = '';
    document.getElementById('nota3').value = '';
    document.getElementById('nota4').value = '';
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}