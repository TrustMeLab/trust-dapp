import { Owner, Tenant, ITrustAPI, Lease } from "./types";
import { ofetch } from "ofetch";
export * from "./types";

export default function TrustAPI(): ITrustAPI {
  const theGraphInstance = ofetch.create({
    baseURL: "https://api.thegraph.com/subgraphs/name/quent043/trustgoerli",
  });
  const backendInstance = ofetch.create({
    baseURL: "http://localhost:3000",
  });

  return {
    getOwnerScore(id: string): Promise<number> {
      return Promise.resolve(0);
    },
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
    getProfile: async (address) => {
      const body = {
        query: `{
          owners(where: {address: "${address}"}) {
            id handle address uri
          }
          tenants(where: {address: "${address}"}) {
            id handle address uri hasLease
          }}`,
      };
      const {
        data: { tenants, owners },
      } = await theGraphInstance<{
        data: { owners: Owner[]; tenants: Tenant[] };
      }>("/", { method: "POST", body });
      if (!tenants.length && !owners.length) {
        throw new Error("profile.not-found");
      }
      return {
        tenant: tenants[0],
        owner: owners[0],
      };
    },
    createProfile: async (body) => {
      return backendInstance("/users", { method: "POST", body });
    },

    cancelLease: async (id: string) => {
      return Promise.resolve(console.log("cancelling lease"));
      //
    },
    validateLease: async (id: string) => {
      return Promise.resolve(console.log("validated lease"));
      //
    },
    declineLease: async (id: string) => {
      return Promise.resolve(console.log("declined lease"));
      //
    },
  };
}
