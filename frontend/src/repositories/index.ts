import {Owner, Tenant, TrustAPI} from "./types";
import {ofetch} from "ofetch";

export function Repository (): TrustAPI {
  const theGraphInstance = ofetch.create({
    baseURL: ''
  })
  const backendInstance = ofetch.create({
    baseURL: ''
  })


  return {
    getOwnerScore(id: string): Promise<number> {
      return Promise.resolve(0);
    },
    getTenantLeases(id: string): Promise<[]> {
      return Promise.resolve([]);
    },
    getTenantScore(id: string): Promise<number> {
      return Promise.resolve(0);
    },
    getProfile: async (address) => {
      const [tenant, owner] = await Promise.allSettled([
        await theGraphInstance<Tenant>('/query', { method: 'POST' }), // tenant
        await theGraphInstance<Owner>('/query', { method: 'POST' }) // owner
      ])
      if (tenant.status === 'rejected' && owner.status === 'rejected') { throw new Error('profile.not-found') }
      return {
        tenant: tenant.status === 'fulfilled' ? tenant.value : undefined,
        owner: owner.status === 'fulfilled' ? owner.value : undefined
      }
    }
  }
}
