import { Router } from 'express';
import { criarLembrete, listarLembretes,listarLembretesHoje, atualizarLembrete, deletarLembrete } from '../controllers/lembreteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', criarLembrete);
router.get('/', listarLembretes);
router.get('/hoje',listarLembretesHoje)
router.put('/:id', atualizarLembrete);
router.delete('/:id', deletarLembrete);

export default router;