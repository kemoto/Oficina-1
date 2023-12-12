const knex = require("../database/knex");

class RelatoriosController {
  async mediaAluno(req, res) {
    const { id } = req.query;
    const somaNotas = {};
    const contagemNotas = {};
    const mediaNotas = {};

    const dados = await knex("notas").where({ alunoId: id });

    dados.forEach((registro) => {
      const materiaId = registro.materiaId;
      const nota = registro.nota;

      somaNotas[materiaId] = (somaNotas[materiaId] || 0) + nota;
      contagemNotas[materiaId] = (contagemNotas[materiaId] || 0) + 1;
    });

    Object.keys(somaNotas).forEach((materiaId) => {
      const soma = somaNotas[materiaId];
      const contagem = contagemNotas[materiaId];

      mediaNotas[materiaId] = soma / contagem;
    });

    res.json(mediaNotas);
  }

  // async mediaPeriodo(req, res) {
  //   const { id } = req.query;
  //   const mediasPorAlunoMateriaBimestre = {};


  //   const data = await knex("notas").where({alunoId: id});

  //   // Percorra os dados e calcule as médias
  //   data.forEach((nota) => {
  //     const { idAluno, idMateria, nota: notaValor, bimestre } = nota;

  //     // Verifique se o bimestre está dentro do intervalo desejado
  //     if (bimestre >= bimestreInicio && bimestre <= bimestreFim) {
  //       const chave = `${idAluno}-${idMateria}-${bimestre}`;

  //       if (!mediasPorAlunoMateriaBimestre[chave]) {
  //         mediasPorAlunoMateriaBimestre[chave] = {
  //           total: notaValor,
  //           contador: 1,
  //         };
  //       } else {
  //         mediasPorAlunoMateriaBimestre[chave].total += notaValor;
  //         mediasPorAlunoMateriaBimestre[chave].contador += 1;
  //       }
  //     }
  //   });

  //   // Calcule as médias finais
  //   const mediasFinais = Object.entries(mediasPorAlunoMateriaBimestre).map(
  //     ([chave, { total, contador }]) => {
  //       const [idAluno, idMateria, bimestre] = chave.split("-");
  //       const media = total / contador;

  //       return {
  //         idAluno: parseInt(idAluno, 10),
  //         idMateria: parseInt(idMateria, 10),
  //         bimestre: parseInt(bimestre, 10),
  //         media,
  //       };
  //     }
  //   );

  //   res.json(mediasFinais);
  // }
}

module.exports = RelatoriosController;