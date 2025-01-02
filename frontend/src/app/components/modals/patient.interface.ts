export interface Patient {
  id: number | null; // Use `null` for new patients
  name: {
    first: string;
    last: string;
  };
  nss: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  assignedDoctor: string;
  disease: string;
  date: string;
}
