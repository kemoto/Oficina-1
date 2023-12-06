function mostrarModal() {
    document.getElementById('nomeEscola').value = '';
    document.getElementById('enderecoEscola').value = '';
    document.getElementById('contatoEscola').value = '';
    
    document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

function adicionarEscola() {
    var nomeEscola = document.getElementById('nomeEscola').value;
    var enderecoEscola = document.getElementById('enderecoEscola').value;
    var contatoEscola = document.getElementById('contatoEscola').value;
    
    if (nomeEscola && enderecoEscola && contatoEscola) {
        
        var tabela = document.getElementById('tabelaEscolas').getElementsByTagName('tbody')[0];
        var novaLinha = tabela.insertRow(tabela.rows.length);
        var celulaNome = novaLinha.insertCell(0);
        var celulaEndereco = novaLinha.insertCell(1);
        var celulaContato = novaLinha.insertCell(2);

        
        celulaNome.innerHTML = nomeEscola;
        celulaEndereco.innerHTML = enderecoEscola;
        celulaContato.innerHTML = contatoEscola;

        var imagem = document.createElement('img');
            imagem.src = '../imagens/Editor2.png'; 
            imagem.alt = 'Ícone do editor'; 
            imagem.style.float = 'right'

            celulaContato.appendChild(imagem);
        
        fecharModal();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}   

document.addEventListener('DOMContentLoaded', function () {
    var tabelaEscolas = document.getElementById('tabelaEscolas');
    var tabelaTurmas = document.getElementById('tabelaTurmas');
    var tabelaAlunos = document.getElementById('tabelaAlunos');
    var tabelaNotas = document.getElementById('tabelaNotas');
    var h2NomeEscola = document.getElementById('nomeEscola');

    function mostrarTurmas(nomeEscola) {
        var turmas = ['Turma A', 'Turma B', 'Turma C'];

        tabelaTurmas.style.display = 'table';
        tabelaTurmas.getElementsByTagName('tbody')[0].innerHTML = '';
        tabelaAlunos.style.display = 'none';
        tabelaNotas.style.display = 'none'; 

        h2NomeEscola.innerText = nomeEscola;

        for (var i = 0; i < turmas.length; i++) {
            var novaLinha = tabelaTurmas.insertRow(tabelaTurmas.rows.length);
            var celulaTurma = novaLinha.insertCell(0);
            celulaTurma.innerHTML = turmas[i];
        }
        
    }

    function mostrarAlunosDaTurma(nomeTurma) {
        var alunosPorTurma = {
            'Turma A': [{ nome: 'Aluno 1', id: 1,}, { nome: 'Aluno 2', id: 2 }, {nome: 'Aluno 3', id: 3 }],
            'Turma B': [{ id: 4, nome: 'Aluno 4' }, { id: 5, nome: 'Aluno 5' }, { id: 6, nome: 'Aluno 6' }],
            'Turma C': [{ id: 7, nome: 'Aluno 7' }, { id: 8, nome: 'Aluno 8' }, { id: 9, nome: 'Aluno 9' }]
        };
    
        tabelaAlunos.getElementsByTagName('tbody')[0].innerHTML = '';
        tabelaNotas.style.display = 'none';
        h2NomeEscola.innerText = nomeTurma;
    
        var alunos = alunosPorTurma[nomeTurma];
    
        for (var i = 0; i < alunos.length; i++) {
            var novaLinha = tabelaAlunos.insertRow(tabelaAlunos.rows.length);
            var celulaAluno = novaLinha.insertCell(0);
            var celulaID = novaLinha.insertCell(1);
    
            celulaID.innerHTML = alunos[i].id;
            celulaAluno.innerHTML = alunos[i].nome;
        }
    
        tabelaAlunos.style.display = 'table';
        tabelaTurmas.style.display = 'none';
    }
    
    function mostrarNotasDoAluno(nomeAluno) {
        var notasPorAluno = {
            'Aluno 1': { materia: 'Matemática', nota1: 8, nota2: 7, nota3: 9, nota4: 8,},
            'Aluno 2': { materia: 'Português', nota1: 7, nota2: 6, nota3: 8, nota4: 7 },
            'Aluno 3': { materia: 'Ciências', nota1: 9, nota2: 8, nota3: 9, nota4: 10 }
        };

        var notas = notasPorAluno[nomeAluno];

        tabelaNotas.getElementsByTagName('tbody')[0].innerHTML = '';
        h2NomeEscola.innerText = 'Notas de ' + nomeAluno;

        var novaLinha = tabelaNotas.insertRow(tabelaNotas.rows.length);
        var celulaMateria = novaLinha.insertCell(0);
        var celulaNota1 = novaLinha.insertCell(1);
        var celulaNota2 = novaLinha.insertCell(2);
        var celulaNota3 = novaLinha.insertCell(3);
        var celulaNota4 = novaLinha.insertCell(4);

        celulaMateria.innerHTML = notas.materia;
        celulaNota1.innerHTML = notas.nota1;
        celulaNota2.innerHTML = notas.nota2;
        celulaNota3.innerHTML = notas.nota3;
        celulaNota4.innerHTML = notas.nota4;

        tabelaNotas.style.display = 'table';
        tabelaAlunos.style.display = 'none';
    }

    tabelaEscolas.addEventListener('click', function (event) {
        var target = event.target;

        if (target.tagName === 'TD') {
            var nomeEscola = target.parentElement.cells[0].innerText;

            mostrarTurmas(nomeEscola);

            tabelaEscolas.style.display = 'none';
        }
    });

    tabelaTurmas.addEventListener('click', function (event) {
        var target = event.target;

        if (target.tagName === 'TD') {
            var nomeTurma = target.innerText;

            mostrarAlunosDaTurma(nomeTurma);
        }
    });

    tabelaAlunos.addEventListener('click', function (event) {
        var target = event.target;

        if (target.tagName === 'TD') {
            var nomeAluno = target.innerText;

            mostrarNotasDoAluno(nomeAluno);
        }
    });
});