export interface Person {
  id: string
  handle: string // name
  address: string
  score: number
  nbPayment: number
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
}
export interface Owner extends Person {}

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

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  NOT_PAID = "NOT_PAID",
  CANCELLED = "CANCELLED",
  CONFLICT = "CONFLICT",
}

export enum UserType {
  OWNER = "OWNER",
  TENANT = "TENANT",
}

export interface RentPayment {
  id: string;
  amount: string;
  paymentDate: string;
  status: string;
  validationDate: string;
  rentPaymentDate: string;
  exchangeRate: string;
  rentPaymentLimitDate: string;
  withoutIssues: boolean;
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
  _rate: string;
  _date: string;
};
