import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { Account, Person } from "../repositories/types";

export const TrustUserContext = createContext<{
  user?: Person;
  account?: Account;
  address?: string;
}>({
  user: undefined,
  account: undefined,
  address: undefined,
});

const TrustUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Person | undefined>();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      if (address === undefined || isConnected !== true) {
        console.log("notfound");
        return;
      }

      // try {
      //   const response = await getUserByAddress(account.address);
      //   if (response?.data?.data?.users[0] !== null) {
      //     setUser(response.data.data.users[0]);
      //   }
      // } catch (err) {
      //   // eslint-disable-next-line no-console
      //   console.error(err);
      // }
    };
    fetchData();
  }, [address, isConnected]);

  const value = useMemo(() => {
    return {
      user,
      address,
    };
  }, [address, user?.id]);

  return (
    <TrustUserContext.Provider value={value}>
      {children}
    </TrustUserContext.Provider>
  );
};

export { TrustUserProvider };

export default TrustUserContext;
