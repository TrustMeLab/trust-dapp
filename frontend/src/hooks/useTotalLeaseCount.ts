import { useState, useEffect } from 'react';
import {LeaseCount, Owner} from "../repositories/TrustAPI";
import {getOwnerById, getLeasesIdsByOwnerId, getLeasesIdsByTenantId} from "../repositories/services/queries";
import {useUser} from "../contexts/UserContext";
import useLeasesByTenantId from "./useTenantLeases";

const useTotalLeaseCount = (tenantId: string, ownerId: string): LeaseCount | null => {
  const [leases, setLeases] = useState<LeaseCount | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count: LeaseCount = {ownerLeases: 0, tenantLeases: 0};
        const tenantLeasesIds = await getLeasesIdsByTenantId(tenantId);
        const ownerLeasesIds = await getLeasesIdsByOwnerId(ownerId);
        if (tenantLeasesIds?.data?.data?.leases) {
          count.tenantLeases = tenantLeasesIds?.data?.data?.leases.length;
        }
        if (ownerLeasesIds?.data?.data?.leases) {
          count.ownerLeases += ownerLeasesIds?.data?.data?.leases.length;
        }
        setLeases(count);
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [tenantId, ownerId]);

  return leases;
};

export default useTotalLeaseCount;
