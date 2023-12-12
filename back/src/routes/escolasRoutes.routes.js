const { Router } = require("express");
const EscolasController = require('../controllers/EscolasController');

const escolasController = new EscolasController;

const escolasRouter = Router();

escolasRouter.post('/', escolasController.create);
escolasRouter.get('/listar', escolasController.index);
escolasRouter.get('/:escolaId', escolasController.show);
escolasRouter.get('/:escolaId/update', escolasController.updateShow);
escolasRouter.put('/:escolaId', escolasController.update);

module.exports = escolasRouter;