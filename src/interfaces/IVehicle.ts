import { z } from 'zod';

const VehicleZodSchema = z.object({
  // _id: z.optional(z.string()),
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long.' }),
  year: z.number().int().gte(1900, { message: 'Year must be between 1900 and 2022' }).lte(2022),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long.' }),
  status: z.optional(z.string()),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { VehicleZodSchema, IVehicle };
