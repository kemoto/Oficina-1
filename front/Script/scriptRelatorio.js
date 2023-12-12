const dados = [
  {
      nomeMateria: 'Matemática',
      nota1: '8',
      nota2: '7',
      nota3: '9',
      nota4: '9',
      nota5: '8',
      nota6: '7',
      nota7: '9',
      nota8: '10',
  },
  {
      nomeMateria: 'Português',
      nota1: '2',
      nota2: '3',
      nota3: '6',
      nota4: '8',
      nota5: '10',
      nota6: '2',
      nota7: '5',
      nota8: '6',
  },
  {
      nomeMateria: 'História',
      nota1: '10',
      nota2: '10',
      nota3: '10',
      nota4: '10',
      nota5: '10',
      nota6: '10',
      nota7: '10',
      nota8: '10',
  },
  {
      nomeMateria: 'Geografia',
      nota1: '8',
      nota2: '7',
      nota3: '9',
      nota4: '10',
      nota5: '8',
      nota6: '7',
      nota7: '9',
      nota8: '10',
  },
  {
      nomeMateria: 'Ciências',
      nota1: '8',
      nota2: '7',
      nota3: '9',
      nota4: '10',
      nota5: '8',
      nota6: '7',
      nota7: '9',
      nota8: '10',
  },
];

populateTable(dados);

function populateTable(dados) {
  const relatorioNotas = document.getElementById('relatorioNotas');

  dados.forEach(materia => {
      const tabela = document.createElement('table');
      tabela.classList.add('materia-table');

      const cabecalho = document.createElement('thead');
      const cabecalhoRow = document.createElement('tr');

      for (let i = 0; i < 9; i++) {
          const th = document.createElement('th');
          th.textContent = i === 0 ? 'Matéria' : `B${i}`;
          cabecalhoRow.appendChild(th);
      }

      cabecalho.appendChild(cabecalhoRow);
      tabela.appendChild(cabecalho);

      const corpo = document.createElement('tbody');
      const corpoRow = document.createElement('tr');

      const nomeMateriaCell = document.createElement('td');
      nomeMateriaCell.textContent = materia.nomeMateria;
      corpoRow.appendChild(nomeMateriaCell);

      for (let i = 1; i <= 8; i++) {
          const notaCell = document.createElement('td');
          notaCell.textContent = materia[`nota${i}`];
          corpoRow.appendChild(notaCell);
      }

      corpo.appendChild(corpoRow);
      tabela.appendChild(corpo);

      relatorioNotas.appendChild(tabela);
  });
}

function generateBarChart(dados, materiaAlvo) {
  const graficoContainer = document.getElementById('graficoContainer');
  
  graficoContainer.innerHTML = '';

  const dadosMatematica = dados.find(materia => materia.nomeMateria === materiaAlvo);

  if (dadosMatematica) {
      const nomeMateriaContainer = document.createElement('div');
      nomeMateriaContainer.classList.add('nome-materia-container');
      nomeMateriaContainer.textContent = materiaAlvo;
      graficoContainer.appendChild(nomeMateriaContainer);

      for (let i = 1; i <= 8; i++) {
          const barraContainer = document.createElement('div');
          barraContainer.classList.add('barra-container');

          const nomeMateria = document.createElement('div');
          nomeMateria.classList.add('nome-materia');
          nomeMateria.textContent = `Bimestre ${i}`;

          const barraGrafico = document.createElement('div');
          barraGrafico.classList.add('barra-grafico');
          barraGrafico.style.width = `${dadosMatematica[`nota${i}`] * 8}%`;

          const porcentagem = document.createElement('div');
          porcentagem.textContent = `${dadosMatematica[`nota${i}`] * 10}%`;
          
          barraContainer.appendChild(nomeMateria);
          barraContainer.appendChild(barraGrafico);
          barraContainer.appendChild(porcentagem);

          graficoContainer.appendChild(barraContainer);
      }
  } else {
      const aviso = document.createElement('p');
      aviso.textContent = `Matéria ${materiaAlvo} não encontrada.`;
      graficoContainer.appendChild(aviso);
  }
}

generateBarChart(dados, 'Matemática');