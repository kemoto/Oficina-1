const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class AlunosController {
  async create(req, res) {
    const { nome } = req.body;

    await knex("alunos").insert({ nome });

    res.json();
  }

  //lista 1 aluno
  async show(req, res) {
    const { alunoId } = req.params;

    if (!alunoId) {
      throw new AppError("Aluno não encontrado.");
    }

    const alunoComMaterias = await knex("notas")
      .select("notas.materiaId", "materias.nome as nomeMateria")
      .select(
        knex.raw(
          `GROUP_CONCAT(JSON_OBJECT('bimestre', bimestre, 'nota', nota) , ',') AS notas`
        )
      )
      .from("notas")
      .leftJoin("materias", "notas.materiaId", "materias.id")
      .groupBy("notas.materiaId", "materias.nome");

    res.json(alunoComMaterias);
  }

  //lista todos os alunos
  async index(req, res) {
    const alunos = await knex("alunos");

    res.json(alunos);
  }

  async update(req, res) {
    const { alunoId } = req.params;
    const { nome } = req.body;

    await knex("alunos")
      .where({ id: alunoId })
      .update({ nome, updated_at: knex.fn.now() });

    res.json();
  }
}

module.exports = AlunosController;
