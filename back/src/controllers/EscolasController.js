const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class EscolasController {
  async create(req, res) {
    const { nome, contato } = req.body;

    if (!nome || !contato) {
      throw new AppError(
        "Todos os campos são necessários para completar o cadastro."
      );
    }

    await knex("escolas").insert({ nome, contato });

    res.status(201).json();
  }

  async index(req, res) {
    const escolas = await knex("escolas");

    res.json(escolas);
  }

  async show(req, res) {
    const { escolaId } = req.query;

    const escola = await knex("escolas")
      .innerJoin("alunos", "escolas.id", "alunos.escolaId")
      .where({ "escolas.id": escolaId });

    res.json(escola);
  }

  async update(req, res) {
    const { escolaId } = req.query;
    const { nome, contato } = req.body;

    await knex("escolas").where({ id: escolaId }).update({
      nome,
      contato,
      updated_at: knex.fn.now(),
    });

    res.json();
  }
}

module.exports = EscolasController;
