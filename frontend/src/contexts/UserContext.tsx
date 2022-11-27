import {
  createContext,
  useContext,
  useState,
  Dispatch,
  PropsWithChildren,
  useEffect,
} from "react";
import { useTrust } from "./TrustContext";
import { Profile } from "../repositories/TrustAPI";
import sleep from "../tools/sleep";
import { useAccount, useContract, useSigner } from "wagmi";
import { Signer } from "ethers";
import { UserType } from "../modules/user/components/SignUp/SignUp";
import { getFullTrustProfileData } from "../repositories/services/queries";

interface IUserContext {
  profile: Profile;
  hasProfile: boolean;
  fetchProfile: (address: string) => Promise<Profile | undefined>;
  setProfile: Dispatch<Profile>;
  loading: boolean;
  address?: string;
  isConnected: boolean;
  signer: Signer | undefined;
}
const UserContext = createContext<IUserContext>(undefined as any);

export const DEFAULT_PROFILE = (): Profile => ({
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
  const { data: signer } = useSigner();

  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE());
  const [loading, setLoading] = useState(false);
  const hasProfile = true;
  // const hasProfile = profile.owner != null && profile.tenant != null;
  const isConnected = walletConnected && hasProfile;

  const fetchProfile = async function (address: string) {
    console.log("fetchProfile", address);
    setLoading(true);
    const [profile] = await Promise.allSettled([
      $api.getProfile(address),
      // getFullTrustProfileData(address),
      sleep(1400),
    ]);
    setLoading(false);
    if (profile.status === "rejected") {
      throw profile.reason;
    }
    console.log("profile", profile.value);
    setProfile(profile.value);
    return profile.value;
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    fetchProfile(address);
  }, [address]);

  const createUser = async function (type: UserType, name: string) {
    if (!signer) {
      return;
    }
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
        signer: signer as Signer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
