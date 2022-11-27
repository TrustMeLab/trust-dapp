import { useState, useEffect } from "react";
import { Tenant } from "../repositories/TrustAPI";
import { getTenantbyHandle } from "../repositories/services/queries";

const useTenantByHandle = (name: string): Tenant | null => {
  const [user, setUser] = useState<Tenant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTenantbyHandle(name);
        if (response?.data?.data?.tenants) {
          setUser(response.data.data.tenants);
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    fetchData();
  }, [name]);

  return user;
};

export default useTenantByHandle;
