import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Image from 'mui-image';

export default function HomepageHeader () {
  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Image src="../public/logo.png" 
            height="5%"
            width="5%"
            fit="fill"/>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
