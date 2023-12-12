const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MateriasController {
  async create(req, res) {
    const { nome } = req.body;

    const materia = await knex("materias").where({nome}).first();

    if(materia) {
      res.json(materia.id);
    }

    if (!nome) {
      throw new AppError("Nome não definido.");
    }

    await knex("materias").insert({ nome });
    res.status(201).json();
  }

  async index(req, res) {
    const materias = await knex("materias").where({nome});

    console.log(nome)

    res.json(materias);
  }

  async update(req, res) {
    const { materiaId } = req.query;
    const { nome } = req.body;

    await knex("materias").where({id: materiaId}).update({nome, updated_at: knex.fn.now()});

    res.json();
  }
}

module.exports = MateriasController;
