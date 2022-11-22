import React, { Fragment, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useCurrentUser } from "./useUser";

export const WithAuthUser = ({ children }: PropsWithChildren<{}>) => {
  // const { currentUser } = useCurrentUser(); // will need to create hook  to fetch User
  const currentUser = "id1";

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate(`/sign-up`);
  });

  if (currentUser) return <Fragment>{children}</Fragment>;
  else {
    return <></>;
  }
};

export default WithAuthUser;
