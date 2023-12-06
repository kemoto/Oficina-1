function preencherTabela() {
    // Suponha que você tenha dados de alunos em um array
    var dadosAlunos = [
        { nome: "João da Silva", escola: "Escola Municipal de Ensino Fundamental Professora Maria de Lourdes Teixeira", turma: "1º Ano", id: "123456789" },
        // Adicione mais dados conforme necessário
    ];

    var tabela = document.getElementById("tabelaAlunos").getElementsByTagName('tbody')[0];

    // Limpa o conteúdo atual da tabela
    tabela.innerHTML = "";

    for (var i = 0; i < dadosAlunos.length; i++) {
        var aluno = dadosAlunos[i];

        var novaLinha = tabela.insertRow(tabela.rows.length);
        var colunaNome = novaLinha.insertCell(0);
        var colunaEscola = novaLinha.insertCell(1);
        var colunaTurma = novaLinha.insertCell(2);
        var colunaID = novaLinha.insertCell(3);
        var colunaEditar = novaLinha.insertCell(4);

        colunaNome.innerHTML = aluno.nome;
        colunaEscola.innerHTML = aluno.escola;
        colunaTurma.innerHTML = aluno.turma;
        colunaID.innerHTML = aluno.id;
        colunaEditar.innerHTML = '<img src="../imagens/Editor2.png" alt="icone Editor2">';
    }
}

// Chamando a função para preencher a tabela ao carregar a página
window.onload = preencherTabela;