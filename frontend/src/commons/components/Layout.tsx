import {useState, MouseEvent, ReactNode, Fragment, PropsWithChildren} from "react";
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
import {useLocation, useNavigate} from "react-router-dom";
import { useDisconnect } from "wagmi";
import { useUser } from "../../contexts/UserContext";
import { theme } from "../../theme";
import Logo from "../../assets/logo_trust.png";

interface Props {
  children: ReactNode;
  activeTab?: string;
}
export const Layout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { hasProfile, address, profile } = useUser();

  const location = useLocation()
  const isActiveTab = (path: string) => location.pathname.includes(path)

  const pages = [
    ...(profile && profile.tenant ? ["tenant"] : []),
    ...(profile && profile.owner ? ["owner"] : [])
  ];
  const settings = ["Profile", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
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
                  <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={false}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page}>
                        <Button
                          variant={isActiveTab(page) ? "outlined" : "text"}
                          onClick={() => handleClickTab(page)}
                        >
                          <Typography textAlign="center">
                            {page === "tenant"
                              ? "Tenant"
                              : "Owner"}
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
                        variant={isActiveTab(page) ? "contained" : "text"}
                        color={isActiveTab(page) ? "secondary" : "primary"}
                        onClick={() => handleClickTab(page)}
                        sx={{
                          my: 2,
                          transition: "0.3s",
                          color:
                            isActiveTab(page)
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
                            ? "Tenant"
                            : "Owner"}
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
                  { hasProfile && <Box
                    sx={{
                      border: 1,
                      borderRadius: "10px",
                      padding: "10px",
                      margin: "10px"
                    }}
                  >
                    {profile.tenant?.handle || profile.owner?.handle}
                  </Box> }
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
