import { useState, useEffect } from 'react';
import {Owner} from "../repositories/TrustAPI";
import {getLeases, getOwnerById} from "../repositories/services/queries";

const useOwnerById = (): Owner | null => {
  const [leases, setLeases] = useState<Owner | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeases();
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

export default useOwnerById;
