import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

export const TrustUserContext = createContext<{
  address?: string;
}>({
  address: undefined,
});

const TrustUserProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      if (address === undefined || isConnected !== true) {
        console.log("notfound");
        return;
      }
    };
    fetchData();
  }, [address, isConnected]);

  const value = useMemo(() => {
    return {
      // user,
      address,
    };
  }, [address /*user?.id*/]); // is it needed or already in ProfileContext?

  return (
    <TrustUserContext.Provider value={value}>
      {children}
    </TrustUserContext.Provider>
  );
};

export { TrustUserProvider };

export default TrustUserContext;
