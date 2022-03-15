import { Router } from 'express';
import { ApiKeyComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/', ApiKeyComponent.create);

router.get('/:id', ApiKeyComponent.findOne);

export default router;
