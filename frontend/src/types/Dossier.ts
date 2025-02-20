// types/Dossier.ts

// Types pour le dossier
export type DossierType = "purchase" | "rental";
export type DossierStatus = "pending" | "approved" | "rejected";

// Interface de base pour la création et modification d'un dossier
export interface DossierBase {
  product_id: number;
  dossier_type: DossierType;
  down_payment?: number;
  loan_amount?: number;
  rental_duration?: number;
  start_date?: string; // ISO date string
}

// Interface pour les documents attachés au dossier
export interface Document {
  id: number;
  dossier_id: number;
  file_url: string;
  uploaded_at: string; // ISO date string
}

// Interface complète d'un dossier (pour lecture et réponse API)
export interface Dossier extends DossierBase {
  id: number;
  user_id: number;
  status: DossierStatus;
  submitted_at: string; // ISO date string
  reviewed_at?: string; // ISO date string
  reviewed_by?: number;
  documents?: Document[];
}
