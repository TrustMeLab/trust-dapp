import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";

export default function HomepageHeader() {
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
			<Box sx={{
            display: "flex",
			alignItems: 'center',
            height: "100px"
          }}>
				<Box
					component="img"
					sx={{
					padding: "10px",
					height: "100%",
					}}
					alt="Your logo."
					src={"/logo_white.png"}
				/>
				<Box sx={{ml: '1em'}}>Trust.Me</Box>
			</Box>
              <Button
                variant="outlined"
                color="secondary"
                disabled={true}
                startIcon={<DashboardIcon />}
              >
                Demo Dapp coming soon...
              </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
