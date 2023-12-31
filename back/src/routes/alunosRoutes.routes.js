const { Router } = require("express");
const AlunosController = require('../controllers/AlunosController');

const alunosController = new AlunosController;

const alunosRouter = Router();

alunosRouter.post('/', alunosController.create);
alunosRouter.get('/listar', alunosController.index);
alunosRouter.get('/listarTodos', alunosController.indexTodos);
alunosRouter.get('/', alunosController.show);
alunosRouter.put('/:alunoId', alunosController.update);

module.exports = alunosRouter;