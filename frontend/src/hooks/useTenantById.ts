import { useState, useEffect } from 'react';
import {Tenant} from "../repositories/TrustAPI";
import {getTenantById} from "../repositories/services/querries";

const useTenantById = (userId: string): Tenant | null => {
  const [user, setUser] = useState<Tenant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTenantById(userId);
        if (response?.data?.data?.user) {
          setUser(response.data.data.user);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [userId]);

  return user;
};

export default useTenantById;
