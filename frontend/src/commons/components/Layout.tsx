import { useState, MouseEvent, ReactNode, Fragment } from "react";
import {
  Box,
  Toolbar,
  Container,
  AppBar,
  Typography,
  IconButton,
  Menu,
  Button,
  Tooltip,
  Avatar,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";
import { useUser } from "../../contexts/UserContext";
import { theme } from "../../theme";
import Logo from "../../assets/logo_trust.png";

interface Props {
  children: ReactNode;
  activeTab?: string;
}
export const Layout = ({ children, activeTab }: Props) => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { hasProfile, address } = useUser();
  const pages = ["tenant", "owner"];
  const settings = ["Profile", "Logout"];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickTab = (page: string) => {
    if (page === "tenant") {
      navigate("/dashboard/tenant/leases");
    } else if (page === "owner") navigate("/dashboard/owner/leases");
  };
  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              component="img"
              sx={{
                height: 64,
                margin: "12px",
              }}
              alt="Your logo."
              src={Logo}
            />

            {hasProfile && (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  ></IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page}>
                        <Button
                          variant={activeTab === page ? "outlined" : "text"}
                          onClick={() => handleClickTab(page)}
                        >
                          <Typography textAlign="center">
                            {page === "tenant"
                              ? "Espace Locataire"
                              : "Espace Propriétaire"}
                          </Typography>
                        </Button>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ display: "flex", gap: "24px", flexGrow: 1 }}>
                  {pages.map((page, index) => {
                    return (
                      <Button
                        key={index}
                        variant={activeTab === page ? "contained" : "text"}
                        color={activeTab === page ? "secondary" : "primary"}
                        onClick={() => handleClickTab(page)}
                        sx={{
                          my: 2,
                          transition: "0.3s",
                          color:
                            activeTab === page
                              ? theme.palette.primary.main
                              : theme.palette.secondary.main,
                          display: "block",
                          "&:hover": {
                            backgroundColor: "#F6F5F5",
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Typography textAlign="center">
                          {page === "tenant"
                            ? "Espace Locataire"
                            : "Espace Propriétaire"}
                        </Typography>
                      </Button>
                    );
                  })}
                </Box>{" "}
              </>
            )}
            {address && (
              <>
                <Box sx={{ flexGrow: 0, display: "flex" }}>
                  <Box
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      padding: "10px",
                      margin: "10px",
                      width: "180px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {address}
                  </Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          if (setting === "Logout") disconnect();
                          navigate("/login");
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box marginTop="42px">{children}</Box>
    </Fragment>
  );
};
