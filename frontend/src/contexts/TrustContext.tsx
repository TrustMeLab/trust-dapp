import {createContext, PropsWithChildren, useContext} from "react";
import TrustAPI from "../repositories/TrustAPI";

// export default createContext<TrustAPI>(Repository())
const TrustContext = createContext<ReturnType<typeof TrustAPI>>(undefined as any)

export function useTrust () {
  const $api = useContext(TrustContext)
  if (!$api) { throw new Error('Context must be used within a Provider')}
  return $api
}

export default function RepositoryContextProvider ({ children }: PropsWithChildren) {
  return (
    <TrustContext.Provider value={TrustAPI()}>
      {children}
    </TrustContext.Provider>
  )
}
