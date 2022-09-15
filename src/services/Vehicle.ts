import { ZodSchema, ZodTypeDef } from 'zod';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import IService from '../interfaces/IService';

abstract class Vehicle<T> implements IService <T> {
  protected _schema: ZodSchema<T>;
  protected _vehicle: IModel<T>;

  constructor(_vehicle: IModel<T>, _schema: ZodSchema<T, ZodTypeDef>) { 
    this._vehicle = _vehicle;
    this._schema = _schema;
  }

  public async create(obj: unknown): Promise<T> {
    const parsed = this._schema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._vehicle.create(parsed.data);
  }

  public async readOne(_id: string): Promise<T> {
    const vehicle = await this._vehicle.readOne(_id);

    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);

    return vehicle;
  }

  public async readAll(): Promise<T[]> {
    return this._vehicle.read();
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    const parsed = this._schema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const vehicle = await this._vehicle.update(_id, obj);

    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);

    return this._vehicle.update(_id, parsed.data);
  }

  public async delete(_id: string): Promise<T> {
    const vehicle = await this._vehicle.delete(_id);

    if (!vehicle) throw new Error(ErrorTypes.EntityNotFound);

    return vehicle;
  }
}

export default Vehicle;