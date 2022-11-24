import { useState, useEffect } from 'react';
import {Lease} from "../repositories/TrustAPI";
import {getLeaseDetailsById} from "../repositories/services/queries";

const useLeseDetails = (id: string): Lease | null => {
  const [leases, setLeases] = useState<Lease | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeaseDetailsById(id);
        if (response?.data?.data?.leases) {
          setLeases(response.data.data.leases);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [setLeases]);

  return leases;
};

export default useLeseDetails;
