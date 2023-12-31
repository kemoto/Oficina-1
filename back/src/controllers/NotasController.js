const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotasController {
  async create(req, res) {
    const { nome, nota, bimestre, alunoId } = req.body;
    let materiaId;

    const materia = await knex("materias").where({nome}).first();

    if(materia) {
      materiaId = materia.id;
    }

    if (!nome) {
      throw new AppError("Nome não definido.");
    }

    await knex("materias").insert({ nome });
    
    const notasCadastradas = await knex("notas").where({bimestre, materiaId, alunoId});

    if(notasCadastradas[0]) {
      throw new AppError("Essa nota já tem cadastro para o bimestre.");
    }

    if (!nota) {
      throw new AppError("É preciso informar a nota.");
    }

    if (!bimestre) {
      throw new AppError("É preciso informar o bimestre da nota.");
    }

    if (!materiaId) {
      throw new AppError("É preciso informar o bimestre da nota.");
    }

    if (!alunoId) {
      throw new AppError(
        "É preciso informar o id do aluno onde a nota será cadastrada."
      );
    }

    await knex("notas").insert({ nota, bimestre, materiaId, alunoId });

    res.json();
  }

  async update(req, res) {
    console.log("teste");
    const { notaId } = req.query;
    const { nota, bimestre, materiaId, alunoId } = req.body;

    await knex("notas").where({ id: notaId }).update({nota, bimestre, materiaId, alunoId, updated_at: knex.fn.now()})

    res.json();
  }
}

module.exports = NotasController;
