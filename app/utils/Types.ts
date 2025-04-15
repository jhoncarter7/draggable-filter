export type ClientStatus = 'Active' | 'Inactive' | 'Pending';

export interface Client {
  id: string;
  name: string;
  clientType: 'Individual' | 'Company';
  email: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  status: ClientStatus;
}

export type SortDirection = 'asc' | 'desc';

export interface SortCriterion {
  id: string; // Unique ID for dnd-kit
  field: keyof Client;
  direction: SortDirection;
}