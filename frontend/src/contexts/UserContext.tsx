import {
  createContext, useContext, useState, Dispatch, PropsWithChildren, useEffect,
} from "react";
import { useTrust } from "./TrustContext";
import { Profile } from "../repositories/TrustAPI";
import sleep from "../tools/sleep";
import { useAccount, useSigner } from "wagmi";
import { Signer } from "ethers";

interface IUserContext {
  profile: Profile;
  hasProfile: boolean;
  fetchProfile: (address: string) => Promise<Profile | undefined>;
  setProfile: Dispatch<Profile>;
  loading: boolean;
  address?: string;
  isConnected: boolean;
  signer: Signer | null | undefined;
}
const UserContext = createContext<IUserContext>(undefined as any);
const DEFAULT_PROFILE = (): Profile => ({
  tenant: undefined,
  owner: undefined,
});

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("Context must be used within a Provider");
  }
  return user;
}

export default function UserContextProvider({ children }: PropsWithChildren) {
  const $api = useTrust();
  const { address, isConnected: walletConnected } = useAccount();
  const { data } = useSigner()
  const signer: Signer | null | undefined = data

  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE());
  const [loading, setLoading] = useState(false);
  const hasProfile = profile.owner != null && profile.tenant != null;
  const isConnected = walletConnected && hasProfile;

  const fetchProfile = async function (address: string) {
    setLoading(true);
    const [profile] = await Promise.allSettled([
      $api.getProfile(address),
      sleep(1400),
    ]);
    setLoading(false);
    if (profile.status === "rejected") {
      throw profile.reason;
    }
    setProfile(profile.value);
    return profile.value;
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        hasProfile,
        setProfile,
        fetchProfile,
        loading,
        address,
        isConnected,
        signer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
