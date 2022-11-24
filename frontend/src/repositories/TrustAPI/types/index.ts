export interface Person {
  id: number;
  handle: string; // name
  address: string;
  score: number;
  nbPayment: number;
}

export type Account = {
  address: string;
  isConnected: boolean | undefined;
  isReconnecting: boolean | undefined;
  isConnecting: boolean | undefined;
  isDisconnected: boolean | undefined;
  status:
    | "connected"
    | "reconnecting"
    | "connecting"
    | "disconnected"
    | undefined;
};

export interface Tenant extends Person {
  hasLease: boolean;
  leases: Lease[];
}
export interface Owner extends Person {
  leases: Lease[];
}

export interface Profile {
  tenant?: Tenant;
  owner?: Owner;
}

export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
}

enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  NOT_PAID = "NOT_PAID",
  CANCELLED = "CANCELLED",
  CONFLICT = "CONFLICT",
}

export interface RentPayment {
  id: string;
  amount: string;
  paymentDate: string;
  withoutIssues: boolean;
  tenant: Tenant;
  owner: Owner;
  lease: Lease;
}

export interface Lease {
  id: string;
  startDate: string; // ms since unix new Date()
  status: LeaseStatus;
  updatedAt: string;
  createdAt: string;
  rentAmount: string; // rent per period
  totalNumberOfRents: string;
  rentPaymentInterval: string;
  uri: string;
  rentPayments: Array<RentPayment>;
  tenant: Tenant;
  owner: Owner;
  paymentToken: string;
  currencyPair: string;
  tenantReviewUri: string;
  ownerReviewUri: string;
  cancelledByOwner: boolean;
  cancelledByTenant: boolean;
}

export type OracleData = {
  rate: string;
  date: string;
};
