export interface Patient {
    id?: number;
    name?: {
        first: string;
        last: string;
    };
    nss?: string;
    birthDate?: string;
    phoneNumber?: string;
    adresse?: string;
    assignedDoctor?: string;
    disease?: string;
    created_at?: string;
    updated_at?: string;
}
