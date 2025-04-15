import { Client } from "./Types";

export const MOCK_CLIENTS: Client[] = [
  {
    id: "cli_1",
    name: "Alice Johnson",
    clientType: "Individual",
    email: "alice.j@email.com",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-05-20T14:30:00Z",
    status: "Active",
  },
  {
    id: "cli_2",
    name: "Bob Williams",
    clientType: "Company",
    email: "bob.w@company.com",
    createdAt: "2022-11-01T09:15:00Z",
    updatedAt: "2023-06-10T11:00:00Z",
    status: "Active",
  },
  {
    id: "cli_3",
    name: "Charlie Brown",
    clientType: "Individual",
    email: "charlie.b@email.com",
    createdAt: "2023-03-22T16:45:00Z",
    updatedAt: "2023-03-22T16:45:00Z",
    status: "Pending",
  },
  {
    id: "cli_4",
    name: "Diana Davis",
    clientType: "Company",
    email: "diana.d@enterprise.com",
    createdAt: "2021-07-10T08:00:00Z",
    updatedAt: "2023-04-25T09:20:00Z",
    status: "Inactive",
  },
  {
    id: "cli_5",
    name: "Ethan Garcia",
    clientType: "Individual",
    email: "ethan.g@email.com",
    createdAt: "2023-06-01T11:30:00Z",
    updatedAt: "2023-06-05T15:00:00Z",
    status: "Active",
  },
  {
    id: "cli_6",
    name: "Fiona Miller",
    clientType: "Company",
    email: "fiona.m@business.org",
    createdAt: "2022-09-15T14:00:00Z",
    updatedAt: "2023-02-10T10:10:00Z",
    status: "Active",
  },
];

export const AVAILABLE_SORT_FIELDS: (keyof Client)[] = [
  "name",
  "clientType",
  "email",
  "createdAt",
  "updatedAt",
  "status",
  "id",
];
export const FIELD_LABELS: Record<keyof Client, string> = {
  id: "Client ID",
  name: "Client Name",
  clientType: "Client Type",
  email: "Email",
  createdAt: "Created At",
  updatedAt: "Updated At",
  status: "Status",
};
