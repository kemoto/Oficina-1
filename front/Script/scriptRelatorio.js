    function limparPesquisa() {
        document.getElementById('dataInicio').value = '';
        document.getElementById('dataFim').value = '';
    }

    // Função para realizar a busca de dados
    function procurar() {
        // Simulação de dados fictícios
        const dadosFicticios = [
            { nome: 'Aluno 1', nota: 7.5, data: '2022-01-01' },
            { nome: 'Aluno 2', nota: 8.2, data: '2022-01-01' },
            { nome: 'Aluno 3', nota: 6.8, data: '2022-01-01' },
            { nome: 'Aluno 1', nota: 8.0, data: '2022-02-01' },
            { nome: 'Aluno 2', nota: 7.2, data: '2022-02-01' },
            { nome: 'Aluno 3', nota: 9.0, data: '2022-02-01' },
        ];

        // Agrupar as notas por período e calcular a média
        const mediasPorPeriodo = {};
        dadosFicticios.forEach(aluno => {
            if (!mediasPorPeriodo[aluno.data]) {
                mediasPorPeriodo[aluno.data] = { total: 0, quantidade: 0 };
            }
            mediasPorPeriodo[aluno.data].total += aluno.nota;
            mediasPorPeriodo[aluno.data].quantidade += 1;
        });

        // Preencher o relatório de notas
        const relatorioNotas = document.getElementById('relatorioNotas');
        dadosFicticios.forEach(aluno => {
            relatorioNotas.innerHTML += `<p class="nota">${aluno.nome}: ${aluno.nota} (${aluno.data})</p>`;
        });

        // Preencher o gráfico com as médias por período
        const grafico = document.getElementById('grafico');
        for (const periodo in mediasPorPeriodo) {
            if (mediasPorPeriodo.hasOwnProperty(periodo)) {
                const media = mediasPorPeriodo[periodo].total / mediasPorPeriodo[periodo].quantidade;
                const barraContainer = document.createElement('div');
                barraContainer.className = 'barra-container';

                const periodoText = document.createElement('p');
                periodoText.className = 'periodo-text';
                periodoText.textContent = `${periodo}`;

                const barra = document.createElement('div');
                barra.className = 'barra-grafico';
                barra.style.width = `${media * 10}%`;

                barraContainer.appendChild(periodoText);
                barraContainer.appendChild(barra);
                grafico.appendChild(barraContainer);
            }
        }
    }