import {Fragment, PropsWithChildren, useEffect} from "react";
import { Container, Skeleton } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";
import { useUser } from "../../../contexts/UserContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { hasProfile, fetchProfile, address, loading, profile } = useUser();

  useEffect(() => {
    if (!address) {
      navigate('/login')
      return
    }
    fetchProfile(address)
      .then(() => navigate(profile.tenant ? '/dashboard/tenant/leases' : '/dashboard/owner/leases'))
      .catch(() => navigate("/sign-up"));
  }, [address]);

  function LoadingRender () {
    return (
      <div>
        <Skeleton variant="rectangular" height={200} width="100%" sx={{ mb: 6 }}/>
        <div style={{ display: "flex" }}>
          <Skeleton variant="rectangular" height={180} width={180} sx={{ mr: 5 }}/>
          <Skeleton variant="rectangular" height={180} width={180} sx={{ mr: 5 }}/>
          <Skeleton variant="rectangular" height={180} width={180} sx={{ mr: 5 }}/>
          <Skeleton variant="rectangular" height={180} width={180} sx={{ mr: 5 }}/>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <Layout>
        <Container maxWidth="xl">
          {loading || !hasProfile ? <LoadingRender/> : <Outlet/>}
        </Container>
      </Layout>
    </Fragment>
  );
};
