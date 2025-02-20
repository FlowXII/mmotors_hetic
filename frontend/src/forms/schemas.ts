import { z } from "zod";

export const VehicleTypeSchema = z.enum(["car", "motorcycle", "boat"]);
export type VehicleType = z.infer<typeof VehicleTypeSchema>;

export const RentalDetailsSchema = z.object({
  monthly_price: z.number().min(0, "Le prix mensuel doit être positif"),
  minimum_duration_months: z.number().min(1, "Durée minimale de 1 mois"),
  includes_insurance: z.boolean().default(true),
  includes_assistance: z.boolean().default(true),
  includes_maintenance: z.boolean().default(true),
  includes_technical_check: z.boolean().default(true),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif"),
  vehicle_type: VehicleTypeSchema,
  brand: z.string().min(1, "La marque est obligatoire"),
  model: z.string().min(1, "Le modèle est obligatoire"),
  year: z.number()
    .min(1900, "Année invalide")
    .max(new Date().getFullYear() + 1),
  mileage: z.number().min(0, "Le kilométrage doit être positif"),
  is_for_sale: z.boolean().default(true),
  is_for_rent: z.boolean().default(false),
  rental_details: RentalDetailsSchema.optional(),
  dossier_type: z.string().optional(), 
}).superRefine((data, ctx) => {
  if (data.is_for_rent && !data.rental_details) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Les détails de location sont requis",
      path: ["rental_details"],
    });
  }
});
export type VehicleFormValues = z.infer<typeof ProductSchema>;

export const CategorySchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  description: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;