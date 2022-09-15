import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycles';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcyclesById = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.readAll(req, res));
route.get(motorcyclesById, (req, res) => motorcycleController.readOne(req, res));
route.put(motorcyclesById, (req, res) => motorcycleController.update(req, res));
route.delete(motorcyclesById, (req, res) => motorcycleController.delete(req, res));

export default route;
