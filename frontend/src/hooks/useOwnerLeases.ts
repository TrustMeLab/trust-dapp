import { useState, useEffect } from "react";
import { Lease, Owner } from "../repositories/TrustAPI";
import {getLeasesByOwnerId} from "../repositories/services/queries";

const useOwnerLeases = (id: string): Lease[] | null => {
  const [leases, setLeases] = useState<Lease[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeasesByOwnerId(id);
        if (response?.data?.data?.leases) {
          setLeases(response?.data?.data?.leases);
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

export default useOwnerLeases;
