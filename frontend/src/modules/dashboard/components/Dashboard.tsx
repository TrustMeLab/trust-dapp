import { Fragment, useEffect } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";
import { useUser } from "../../../contexts/UserContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { hasProfile, fetchProfile, address, loading } = useUser();

  useEffect(() => {
    if (!address) {
      navigate('/login')
      return
    }
    !hasProfile && fetchProfile(address).catch(() => navigate("/sign-up"));
  }, [address]);

  return (
    <Fragment>
      <Layout>
        <Container maxWidth="xl">
          <p>Dashboard</p>
        </Container>
      </Layout>
    </Fragment>
  );
};
