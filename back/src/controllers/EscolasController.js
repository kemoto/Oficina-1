const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class EscolasController {
  async create(req, res) {
    const { nome, endereco, contato } = req.body;

    if (!nome || !endereco || !contato) {
      throw new AppError(
        "Todos os campos são necessários para completar o cadastro."
      );
    }

    await knex("escolas").insert({ nome, endereco, contato });

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
    const { escolaId, nome, endereco, contato } = req.body;

    await knex("escolas").where({ id: escolaId }).update({
      nome,
      endereco,
      contato,
      updated_at: knex.fn.now(),
    });

    res.json();
  }
}

module.exports = EscolasController;
