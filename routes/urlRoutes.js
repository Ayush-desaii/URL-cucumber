import express from "express";
import { createShortUrl, redirectUrl, getStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:shortId', redirectUrl);
router.get('/stats/:shortId', getStats);

export default router;
