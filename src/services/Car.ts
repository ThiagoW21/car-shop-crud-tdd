import Vehicle from './Vehicle';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService extends Vehicle<ICar> {
  constructor(model: IModel<ICar>, schema = CarZodSchema) { 
    super(model, schema);
  }
}

export default CarService;