import express, { Router } from 'express';
import { analyticsUpgrade } from '../controllers/analytics';

const router: Router = express.Router();

router.route('/:analyticsField').put(analyticsUpgrade);

export default router;