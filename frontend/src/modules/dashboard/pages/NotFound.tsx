import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Layout } from "../../../commons/components/Layout";
import { Link } from "react-router-dom";
import Picture404 from "../../../assets/404.png";

export const NotFound = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid>
          <Typography variant="h1">404</Typography>
          <Typography variant="h5" gutterBottom>
            The page you’re looking for doesn’t exist.
          </Typography>
          <Button variant="contained">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Back Home
            </Link>
          </Button>
        </Grid>
      </Container>
      <img
        src={Picture404}
        alt=""
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
