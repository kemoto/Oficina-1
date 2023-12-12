const { Router } = require("express");
const EscolasController = require('../controllers/EscolasController');

const escolasController = new EscolasController;

const escolasRouter = Router();

escolasRouter.post('/', escolasController.create);
escolasRouter.get('/listar', escolasController.index);
escolasRouter.get('/:escolaId', escolasController.show);
escolasRouter.put('/', escolasController.update);

module.exports = escolasRouter;