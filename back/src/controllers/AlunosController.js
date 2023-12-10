const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class AlunosController {
  async create(req, res) {
    const { nome, escolaId, turmaId } = req.body;

    if (!nome || !escolaId || !turmaId) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await knex("alunos").insert({ nome, escolaId, turmaId });

    res.json();
  }

  //lista 1 aluno
  async show(req, res) {
    const { alunoId } = req.query;

    if (!alunoId) {
      throw new AppError("Aluno não encontrado.");
    }

    const alunoComMaterias = await knex("alunos")
      .innerJoin("notas", "alunos.id", "notas.alunoId")
      .innerJoin("materias", "materias.id", "notas.materiaId")
      .where({ "alunos.id": alunoId });

    res.json(alunoComMaterias);
  }

  //lista todos os alunos
  async index(req, res) {
    const alunos = await knex("alunos");

    res.json(alunos);
  }

  async update(req, res) {
    const { nome, escolaId, turmaId } = req.body;
    const { alunoId } = req.query;

    if (!nome || !escolaId || !turmaId) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await knex("alunos")
      .where({ id: alunoId })
      .update({ nome, escolaId, turmaId, updated_at: knex.fn.now() });

    res.json();
  }
}

module.exports = AlunosController;
