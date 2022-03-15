import { Router } from 'express';
import { FeatureFlagComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', FeatureFlagComponent.findAll);
router.post('/', FeatureFlagComponent.create);
router.get('/:id', FeatureFlagComponent.findOne);
router.put('/:id', FeatureFlagComponent.update);
router.delete('/:id', FeatureFlagComponent.remove);

/**
 * @export {express.Router}
 */
export default router;
