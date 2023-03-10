import { Router } from 'express';
import * as jogoController from '~/domains/jogos/controllers';
import queries from '~/middlewares/queries';

const jogosRouter = Router();

jogosRouter.post('/', jogoController.create);
jogosRouter.get('/', queries, jogoController.getAll);
jogosRouter.get('/:id', jogoController.getById);
jogosRouter.put('/:id', jogoController.update);
jogosRouter.delete('/:id', jogoController.deleteById);

export default jogosRouter;