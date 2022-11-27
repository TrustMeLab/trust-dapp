import { useState, useEffect } from "react";
import { Tenant } from "../repositories/TrustAPI";
import { getTenants } from "../repositories/services/queries";

const useTenants = (): Tenant[] | null => {
  const [users, setUsers] = useState<Tenant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTenants();
        if (response?.data?.data?.tenants) {
          setUsers(response.data.data.tenants);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [users]);

  return users;
};

export default useTenants;
