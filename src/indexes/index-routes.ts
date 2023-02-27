import { Router } from 'express';
import categoriaJogosRouter from '~/domains/categoria-jogos/routes';
import jogosAdquiridosRouter from '~/domains/jogos-adquiridos/routes';
import jogosRouter from '~/domains/jogos/routes';
import usuariosRouter from '~/domains/usuarios/routes';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use('/categoria-jogos', categoriaJogosRouter);
router.use('/jogos', jogosRouter);
router.use('/jogos-adquiridos', jogosAdquiridosRouter);

export default router;