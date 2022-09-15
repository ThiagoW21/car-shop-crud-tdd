import Vehicle from './Vehicle';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';

class Motorcycle extends Vehicle<IMotorcycle> {
  constructor(model: IModel<IMotorcycle>, schema = MotorcycleZodSchema) { 
    super(model, schema);
  }
}

export default Motorcycle;