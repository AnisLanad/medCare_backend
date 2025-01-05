export interface Patient {
  id: number | null;
  name: {
    first: string;
    last: string;
  };
  nss: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  insurance: string;
  emergencyContact: string;
  insuranceDisplay: string;
  lastUpdated: string;
  age: number | null;
}