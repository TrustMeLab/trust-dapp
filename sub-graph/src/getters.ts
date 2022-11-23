import {ZERO, ZERO_ADDRESS} from "./constants";
import {Lease, Owner, RentPayment, Tenant} from "../generated/schema";

export function getOrCreateTenant(id: string): Tenant {
  let tenant = Tenant.load(id);
  if (!tenant) {
    tenant = new Tenant(id);
    tenant.handle = '';
    tenant.address = ZERO_ADDRESS;
    tenant.uri = '';
    tenant.hasLease = false;
    tenant.save();
  }
  return tenant;
}

export function getOrCreateOwner(id: string): Owner {
  let owner = Owner.load(id);
  if (!owner) {
    owner = new Owner(id);
    owner.handle = '';
    owner.address = ZERO_ADDRESS;
    owner.uri = '';
    owner.save();
  }
  return owner;
}

export function getOrCreateLease(id: string, ownerId: string, tenantId: string): Lease {
  let lease = Lease.load(id);
  if (!lease) {
    lease = new Lease(id);
    lease.owner = getOrCreateOwner(ownerId).id;
    lease.tenant = getOrCreateTenant(tenantId).id;
    lease.rentAmount = ZERO;
    lease.totalNumberOfRents = ZERO;
    lease.paymentToken = ZERO_ADDRESS;
    lease.rentPaymentInterval = ZERO;
    lease.rentPaymentLimitTime = ZERO;
    lease.startDate = ZERO;
    lease.status = 'PENDING';
    lease.uri = '';
    lease.cancelledByOwner = false;
    lease.cancelledByTenant = false;
    lease.save();
  }
  return lease;
}

export function getOrCreateRentPayment(id: string): RentPayment {
  let rentPayment = RentPayment.load(id);
  if (!rentPayment) {
    rentPayment = new RentPayment(id);
    rentPayment.amount = ZERO;
    rentPayment.paymentToken = ZERO_ADDRESS;
    rentPayment.validationDate = ZERO;
    rentPayment.rentPaymentDate = ZERO;
    rentPayment.rentPaymentLimitDate = ZERO;
    rentPayment.withoutIssues = false;
    rentPayment.tenant = '';
    rentPayment.owner = '';
    rentPayment.lease = '';
    rentPayment.exchangeRate = ZERO;
    rentPayment.exchangeRateTimestamp = ZERO;
    rentPayment.status = 'PENDING';
    rentPayment.save();
  }
  return rentPayment;
}
