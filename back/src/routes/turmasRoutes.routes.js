const { Router } = require("express");
const TurmasController = require('../controllers/TurmasController');

const turmasController = new TurmasController;

const turmasRouter = Router();

turmasRouter.post('/', turmasController.create);
turmasRouter.get('/listar', turmasController.index);
turmasRouter.put('/:turmaId', turmasController.update);
// turmasRouter.delete('/:id', turmasController.delete);

module.exports = turmasRouter;