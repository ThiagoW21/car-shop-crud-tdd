interface IService<T> {
  create(obj: unknown): Promise<T>
  readAll(): Promise<T[]>
  readOne(_id: string): Promise<T>
  update(_id: string, obj: T): Promise<T | null>
  delete(_id: string): Promise<T | null>
}

export default IService;