import { Owner, Tenant, Profile, Lease } from "./types";
import { ofetch } from "ofetch";
import { SUBGRAPH_URL } from "../../config/config";
export * from "./types";

export default function TrustAPI() {
  const theGraphInstance = ofetch.create({
    baseURL: SUBGRAPH_URL
  });

  return {
    getTenantLeases: async (address: string): Promise<Lease[]> => {
      const body = {
        query: `{
          leases(where: {tenant_: {address: "${address}"}}) {
            id
            rentAmount
            rentPaymentInterval
            rentPaymentLimitTime
            owner {
              handle
              id
            }
            status
            startDate
            totalNumberOfRents
          }
        }`,
      };

      const {
        data: { leases },
      } = await theGraphInstance<{
        data: { leases: Lease[] };
      }>("/", { method: "POST", body });
      if (!!leases.length) {
        throw new Error("leases.not-found");
      }
      return leases;
    },
    getTenantScore(id: string): Promise<number> {
      return Promise.resolve(0);
    },
    getProfile: async (address: string): Promise<Profile> => {
      const body = {
        query: `{
          owners(where: {address: "${address}"}) {
            id handle address uri
            leases(where: {status_not: PENDING}) {
              rentPayments(where: {status: PAID}) {
                withoutIssues
              }
            }
          }
          tenants(where: {address: "${address}"}) {
            id handle address uri hasLease
            leases(where: {status_not: PENDING}) {
              rentPayments(where: {status_in: [PAID, NOT_PAID]}) {
                status
              }
            }
          }
        }`,
      };
      const { data: { tenants: [tenant], owners: [owner] } } = await theGraphInstance("/", { method: "POST", body });

      if (!tenant && !owner) {
        throw new Error("profile.not-found");
      }
      
      if (tenant) {
        const payments = tenant.leases.flatMap((lease: any) => lease.rentPayments)
        const paid = payments.filter((payment: any) => payment.status === 'PAID')
        tenant.score = payments.length ? paid.length / payments.length : 1
        tenant.nbPayment = payments.length
        delete tenant.leases
      }
      if (owner) {
        const payments = owner.leases.flatMap((lease: any) => lease.rentPayments)
        const withoutIssues = payments.filter((payment: any) => payment.withoutIssues)
        owner.score = payments.length ? withoutIssues.length / payments.length : 1
        owner.nbPayment = payments.length
        delete owner.leases
      }

      return {
        tenant,
        owner
      }
    }
  }
}
