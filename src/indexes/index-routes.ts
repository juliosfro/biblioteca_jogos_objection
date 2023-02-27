import { Router } from 'express';
import categoriaJogosRouter from '~/domains/categoria-jogos/routes';
import usuariosRouter from '~/domains/usuarios/routes';

const router = Router();

router.use('/usuarios', usuariosRouter);
router.use('/categoria-jogos', categoriaJogosRouter);

export default router;