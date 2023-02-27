import { Router } from 'express';
import usuarioController from '~/domains/usuarios/controllers';

const usuariosRouter = Router();

usuariosRouter.post('/cadastro', usuarioController.create);
usuariosRouter.get('/', usuarioController.getAll);
usuariosRouter.get('/:id', usuarioController.getById);
usuariosRouter.put('/:id', usuarioController.update);
usuariosRouter.delete('/:id', usuarioController.deleteById);

export default usuariosRouter;
