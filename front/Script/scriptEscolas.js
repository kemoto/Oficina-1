
async function getUsers() { 
    try {
        const response = await fetch();
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        return [];
    }
}
    
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
