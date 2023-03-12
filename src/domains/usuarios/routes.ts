import { Router } from 'express';
import usuarioController from '~/domains/usuarios/controllers';
import queries from '~/middlewares/queries';

const usuariosRouter = Router();

usuariosRouter.post('/login', usuarioController.login);
usuariosRouter.put('/login', usuarioController.refresh);
usuariosRouter.post('/cadastro', usuarioController.create);
usuariosRouter.get('/', queries, usuarioController.getAll);
usuariosRouter.get('/:id', usuarioController.getById);
usuariosRouter.put('/:id', usuarioController.update);
usuariosRouter.delete('/:id', usuarioController.deleteById);

export default usuariosRouter;
