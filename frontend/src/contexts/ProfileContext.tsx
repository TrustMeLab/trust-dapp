import {createContext, useContext, useState, PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import {useTrust} from "./TrustContext";
import { Profile } from "../repositories/TrustAPI";
import sleep from "../tools/sleep";

interface IProfileContext {
  profile: Profile
  hasProfile: boolean
  fetchProfile: (address: string) => Promise<Profile | undefined>
  loading: boolean
}
const ProfileContext = createContext<IProfileContext>(undefined as any)
const DEFAULT_PROFILE = (): Profile => ({ tenant: undefined, owner: undefined })

export function useProfile () {
  const profile = useContext(ProfileContext)
  if (!profile) { throw new Error('Context must be used within a Provider') }
  return profile
}

export default function ProfileContextProvider ({ children }: PropsWithChildren) {
  const $api = useTrust()
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE())
  const [loading, setLoading] = useState(false)
  const hasProfile = profile.owner != null && profile.tenant != null

  const fetchProfile = async function (address: string) {
    setLoading(true)
    try {
      const [profile] = await Promise.all([
        $api.getProfile(address),
        sleep(800)
      ])
      setProfile(profile)
      return profile
    } catch (e) {
      throw e
    } finally {
      setLoading(true)
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, hasProfile, fetchProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  )
}
