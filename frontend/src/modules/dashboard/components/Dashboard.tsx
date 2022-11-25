import {Fragment, PropsWithChildren, useEffect} from "react";
import { Container, Skeleton } from "@mui/material";
import {useNavigate, Outlet, useLocation} from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";
import { useUser } from "../../../contexts/UserContext";
import LoadingRender from "../../../commons/components/LoadingSkeleton";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const { hasProfile, fetchProfile, address, loading, profile } = useUser();

  useEffect(() => {
    if (!address) { navigate('/login'); return }
    if (pathname === '/dashboard' && hasProfile) {
      navigate(profile.tenant
        ? 'tenant/leases'
        : 'owner/leases'
      )
      return
    }

    !hasProfile && !loading && fetchProfile(address)
      .then((res) => pathname === '/dashboard' && navigate(res?.tenant
        ? 'tenant/leases'
        : 'owner/leases'
      ))
      .catch(() => navigate("/sign-up"));
  }, []);

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
