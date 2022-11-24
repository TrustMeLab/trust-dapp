import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import { Web3Button } from "@web3modal/react";

export default function HomepageHeader() {
  const { isConnected } = useUser();
  return (
    <AppBar position="static" sx={{ position: "sticky", top: 0, zIndex: 99 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "100px",
            letterSpacing: ".4rem",
          }}
        >
          <Box
            component="img"
            sx={{
              padding: "10px",
              height: "100%",
            }}
            alt="Your logo."
            src={"../public/logo_white.png"}
          />

          {isConnected ? (
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<LoginIcon />}
              >
                Sign-Up
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
