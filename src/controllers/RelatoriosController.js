const knex = require("../database/knex");

class RelatoriosController {
  async mediaAluno(req, res) {
    const { id } = req.query;

    const notasAluno = await knex("notas").where({alunoId: id});
    
    res.json(notasAluno);
  }
}

module.exports = RelatoriosController;