import { Router } from 'express';
import jogosAdquiridosController from '~/domains/jogos-adquiridos/controllers';

const jogosAdquiridosRouter = Router();

jogosAdquiridosRouter.post('/', jogosAdquiridosController.create);
jogosAdquiridosRouter.put('/:idJogo', jogosAdquiridosController.update);
jogosAdquiridosRouter.get('/', jogosAdquiridosController.getAll);
jogosAdquiridosRouter.get('/jogos/mais-adquiridos', jogosAdquiridosController.mostPurchasedGames);

export default jogosAdquiridosRouter;
