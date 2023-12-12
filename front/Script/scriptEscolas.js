const dados = [
    {
        nome: 'Escola 1',
        endereco: 'Rua 1',
        contato: '1111-1111'
    },
    {
        nome: 'Escola 2',
        endereco: 'Rua 2',
        contato: '2222-2222'
    },
    {
        nome: 'Escola 3',
        endereco: 'Rua 3',
        contato: '3333-3333'
    },
    {
        nome: 'Escola 4',
        endereco: 'Rua 4',
        contato: '4444-4444'
    },
    {
        nome: 'Escola 5',
        endereco: 'Rua 5',
        contato: '5555-5555'
    },
    {
        nome: 'Escola 6',
        endereco: 'Rua 6',
        contato: '6666-6666'
    },
    {
        nome: 'Escola 7',
        endereco: 'Rua 7',
        contato: '7777-7777'
    },
    {
        nome: 'Escola 8',
        endereco: 'Rua 8',
        contato: '8888-8888'
    },
    {
        nome: 'Escola 9',
        endereco: 'Rua 9',
        contato: '9999-9999'
    },
    {
        nome: 'Escola 10',
        endereco: 'Rua 10',
        contato: '1010-1010'
    },
    {
        nome: 'Escola 11',
        endereco: 'Rua 11',
        contato: '1111-1111'
    },
    {
        nome: 'Escola 12',
        endereco: 'Rua 12',
        contato: '1212-1212'
    },
    {
        nome: 'Escola 13',
        endereco: 'Rua 13',
        contato: '1313-1313'
    },
    {
        nome: 'Escola 14',
        endereco: 'Rua 14',
        contato: '1414-1414'
    },
    {
        nome: 'Escola 15',
        endereco: 'Rua 15',
        contato: '1515-1515'
    },
    {
        nome: 'Escola 16',
        endereco: 'Rua 16',
        contato: '1616-1616'
    },
    {
        nome: 'Escola 17',
        endereco: 'Rua 17',
        contato: '1717-1717'
    },
    {
        nome: 'Escola 18',
        endereco: 'Rua 18',
        contato: '1818-1818'
    },
    {
        nome: 'Escola 19',
        endereco: 'Rua 19',
        contato: '1919-1919'
    },
    {
        nome: 'Escola 20',
        endereco: 'Rua 20',
        contato: '2020-2020'
    },
    {
        nome: 'Escola 21',
        endereco: 'Rua 21',
        contato: '2121-2121'
    },
    {
        nome: 'Escola 22',
        endereco: 'Rua 22',
        contato: '2222-2222'
    },
    {
        nome: 'Escola 23',
        endereco: 'Rua 23',
        contato: '2323-2323'
    },
    

    
];

async function populateTable(dados) {
    if (dados && dados.length > 0) {
        const tableBody = document.querySelector('#tabelaEscolas tbody');
        tableBody.innerHTML = '';

        dados.forEach(escola => {
            const newRow = tableBody.insertRow();

            const nomeCell = newRow.insertCell(0);
            const nomeLink = document.createElement('a');
            nomeLink.href = '../Turmas/turmas.html'; 
            nomeLink.textContent = escola.nome;
            nomeCell.appendChild(nomeLink);
    

            const enderecoCell = newRow.insertCell(1);
            enderecoCell.textContent = escola.endereco;

            const contatoCell = newRow.insertCell(2);
            contatoCell.textContent = escola.contato;

            const editCell = newRow.insertCell(3);
            var imagem = document.createElement('img');
            imagem.src = '../imagens/Editor2.png';
            imagem.style.float = 'right';
            editCell.appendChild(imagem);
        });
    }
}
populateTable(dados);

function adicionarEscola() {
    const nomeEscola = document.getElementById('nomeEscola').value;
    const enderecoEscola = document.getElementById('enderecoEscola').value;
    const contatoEscola = document.getElementById('contatoEscola').value;

    const novaEscola = {
        nome: nomeEscola,
        endereco: enderecoEscola,
        contato: contatoEscola
    };

    dados.push(novaEscola); 

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
    document.getElementById('nomeEscola').value = '';
    document.getElementById('enderecoEscola').value = '';
    document.getElementById('contatoEscola').value = '';
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}
