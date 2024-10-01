import { Router } from 'express';


const router = Router();

router.post('/confirmation', Pay.confirmationController);

export const paymentRoutes = router;