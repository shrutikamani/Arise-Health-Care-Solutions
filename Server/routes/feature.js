import express from 'express';
import {
  createFeature,
  getAllFeatures,
  getFeatureById,
  updateFeature,
  deleteFeature
} from '../controllers/feature.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/create', upload, createFeature);
router.get('/all', getAllFeatures);
router.get('/:id', getFeatureById);
router.put('/:id', upload, updateFeature);
router.delete('/:id', deleteFeature);

export default router;
