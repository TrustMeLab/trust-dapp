import {Fragment, PropsWithChildren, useEffect} from "react";
import { Container, Skeleton } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";
import { useUser } from "../../../contexts/UserContext";
import LoadingRender from "../../../commons/components/LoadingSkeleton";

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
