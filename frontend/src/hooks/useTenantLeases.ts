import { useState, useEffect } from 'react';
import {Lease} from "../repositories/TrustAPI";
import {getLeaseDetailsById, getLeasesByTenantId} from "../repositories/services/queries";

const useLeasesByTenantId = (id: string): Lease[] => {
  const [leases, setLeases] = useState<Lease[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('id', id);
        const response = await getLeasesByTenantId(id);
        // console.log('response', response);
        if (response?.data?.data?.leases) {
          setLeases(response.data.data.leases);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  return leases;
};

export default useLeasesByTenantId;
