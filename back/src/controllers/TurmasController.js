const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TurmasController {
  async create(req, res) {
    const { nome, escolaId } = req.body;

    await knex("turmas").insert({ nome, escolaId });

    res.status(201).json();
  }

  async show(req, res) {
    const { turmaId } = req.params;

    const turmaComAlunos = await knex("alunos").where({ turmaId });

    res.json(turmaComAlunos);
  }

  async index(req, res) {
    const { escolaId } = req.query;
    const turmas = await knex("turmas").where({ escolaId });

    res.json(turmas);
  }

  async update(req, res) {
    const { turmaId } = req.params;
    const { nome } = req.body;

    await knex("turmas")
      .where({ id: turmaId })
      .update({ nome, updated_at: knex.fn.now() });

    res.json();
  }
}

module.exports = TurmasController;
