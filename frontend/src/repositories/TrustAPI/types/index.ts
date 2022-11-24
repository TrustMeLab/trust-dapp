export interface Person {
  id: number
  handle: string // name
  address: string
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
  hasLease: boolean
}
export interface Owner extends Person {}

export interface Profile {
  tenant?: Tenant
  owner?: Owner
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
  amount: number;
  paymentToken: number;
  paymentDate: number;
  withoutIssues: boolean;
  tenant: Tenant;
  owner: Owner;
  lease: Lease;
}

export interface Lease {
  id: string; // 1-0
  startDate: string; // ms since unix new Date()
  status: LeaseStatus;
  updatedAt: string;
  createdAt: string;
  rentAmount: number; // rent per period
  totalNumberOfRents: number;
  rentPaymentInterval: number;
  uri: string;
  rentPayments: Array<RentPayment>;
  tenant: Tenant;
  owner: Owner;
  paymentToken: number;
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
