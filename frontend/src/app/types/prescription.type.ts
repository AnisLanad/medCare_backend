type medicament_details = {
  id: number;
  Nom: string;
  Dosage: string;
  Fabricant: string;
  Forme: string;
  forme_display: string;
};
type medicament = {
  id: number;
  Ordonnance: number;
  Medicament: number;
  medicament_details: medicament_details;
  Posologie: string;
};
export type Tprescription = {
  id: number;
  Consultation: number;
  Medicaments: number[];
  Description: string;
  ordonnance_medicaments: medicament[];
};
