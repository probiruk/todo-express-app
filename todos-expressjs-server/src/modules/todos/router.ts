import { Router, Request, Response } from 'express';
import resultHandler from '../../utils/resultHandler';
import { todosController } from './controllers';

const router = Router();

// Get All
router.get(
  '/get-all',
  resultHandler(async (req: Request, res: Response) => {
    return res.json(todosController.getAll());
  }),
);

// Update
router.put(
  '/update/:id',
  resultHandler(async (req: Request, res: Response) => {
    const payload = req.body;
    const { id } = req.params;
    return res.json(todosController.update(payload, id));
  }),
);

// Update
router.delete(
  '/delete/:id',
  resultHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.json({ msg: todosController.delete(id) });
  }),
);

router.post(
  '/',
  resultHandler(async (req: Request, res: Response) => {
    return todosController.create(req.body);
  }),
);

// TODO: Add routes for deleting and editing todos
// Use route DELETE /:id for deletion amd PUT /:id for editing

export default router;
