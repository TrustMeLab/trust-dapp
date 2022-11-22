import { Fragment, useEffect, useState, MouseEvent } from "react";
import { Container } from "@mui/material";
import { useProfile } from "../../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../commons/components/Layout";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { hasProfile, fetchProfile } = useProfile();

  useEffect(() => {
    !hasProfile && fetchProfile("0").catch(() => navigate("/sign-up"));
  });

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
