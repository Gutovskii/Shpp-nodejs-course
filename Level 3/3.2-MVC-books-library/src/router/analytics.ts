import express from 'express';
import { clickedUpdate } from '../controllers/clickedAnalytics';
import { wishfulUpdate } from '../controllers/wishfulAnalytics';

const router = express.Router();

router.route('/clicked/:id').put(clickedUpdate);
router.route('/wishful/:id').put(wishfulUpdate);

export default router;