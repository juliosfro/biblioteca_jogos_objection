import { Router } from 'express';
import usuariosRouter from '~/domains/usuarios/routes';

const router = Router();

router.use('/usuarios', usuariosRouter);

export default router;