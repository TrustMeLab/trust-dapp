import { useState, useEffect } from "react";
import { Lease, Owner } from "../repositories/TrustAPI";
import { getLeases, getOwnerLeases } from "../repositories/services/querries";

const useOwnerLeases = (address: string): Lease[] | null => {
  const [leases, setLeases] = useState<Lease[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOwnerLeases(address);
        if (response?.data) {
          setLeases(response.data);
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
