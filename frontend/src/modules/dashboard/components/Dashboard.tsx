import { Fragment } from "react";
import { Container } from "@mui/material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";
import LoadingRender from "../../../commons/components/LoadingSkeleton";

export const Dashboard = () => {

  return (
    <Fragment>
      <Layout>
        <Container maxWidth="xl">
          {loading || !hasProfile ? <LoadingRender /> : <Outlet />}
        </Container>
      </Layout>
    </Fragment>
  );
};
