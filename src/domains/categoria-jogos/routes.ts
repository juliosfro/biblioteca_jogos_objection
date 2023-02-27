import { Router } from 'express';
import * as categoriaJogosController from '~/domains/categoria-jogos/controllers';

const categoriaJogosRouter = Router();

categoriaJogosRouter.post('/', categoriaJogosController.create );
categoriaJogosRouter.get('/', categoriaJogosController.getAll);
categoriaJogosRouter.get('/:id', categoriaJogosController.getById);
categoriaJogosRouter.put('/:id', categoriaJogosController.update);
categoriaJogosRouter.delete('/:id', categoriaJogosController.deleteById);

export default categoriaJogosRouter;