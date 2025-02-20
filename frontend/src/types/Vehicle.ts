// types/Vehicle.ts

// Type de véhicule
export type VehicleType = "car" | "motorcycle" | "boat";

// Détails de location (optionnels)
export interface RentalDetails {
  monthly_price: number;
  minimum_duration_months: number;
  includes_insurance: boolean;
  includes_assistance: boolean;
  includes_maintenance: boolean;
  includes_technical_check: boolean;
}

// Interface de base pour la création et modification d'un véhicule
export interface VehicleBase {
  name: string;
  description?: string;
  price: number;
  vehicle_type: VehicleType;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  is_for_sale: boolean;
  is_for_rent: boolean;
  rental_details?: RentalDetails;
}

// Interface complète d'un véhicule (pour lecture et réponse API)
export interface Vehicle extends VehicleBase {
  id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
