import {AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import { Fragment } from 'react'
import HomepageHeader from "./Header";
import Hero1 from "./Hero1";

export default function Homepage () {
  return (
    <Fragment>
      <HomepageHeader />
      <Hero1/>
    </Fragment>
  )
}
