const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TurmasController {
  async create(req, res) {
    const { nome, ano, escolaId } = req.body;

    if (!nome || !ano) {
      throw new AppError(
        "Todos os campos são necessários para completar o cadastro."
      );
    }

    if (!escolaId) {
      throw new AppError(
        "É preciso informar o id da escola a qual a turma será vinculada."
      );
    }

    await knex("turmas").insert({ nome, ano, escolaId });

    res.status(201).json();
  }

  async show(req, res) {
    const { turmaId } = req.params;
  
    const turmaComAlunos = await knex("alunos").where({ turmaId });
    
    res.json(turmaComAlunos);
  }

  async index(req, res) {
    const turmas = await knex("turmas");

    res.json(turmas);
  }

  async update(req, res) {
    const { turmaId } = req.params;
    const { nome, ano } = req.body;

    if (!nome || !ano) {
      throw new AppError("Todos os campos devem estar preenchidos.");
    }

    await knex("turmas")
      .where({ id: turmaId })
      .update({ nome, ano, updated_at: knex.fn.now() });

    res.json();
  }
}

module.exports = TurmasController;
