import { Router } from 'express';
import categoriaJogosRouter from '~/domains/categoria-jogos/routes';
import jogosRouter from '~/domains/jogos/routes';
import usuariosRouter from '~/domains/usuarios/routes';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use('/categoria-jogos', categoriaJogosRouter);
router.use('/jogos', jogosRouter);

export default router;