import { Router } from 'express';
import jogosAdquiridosController from '~/domains/jogos-adquiridos/controllers';

const jogosAdquiridosRouter = Router();

jogosAdquiridosRouter.post('/', jogosAdquiridosController.create);

export default jogosAdquiridosRouter;
