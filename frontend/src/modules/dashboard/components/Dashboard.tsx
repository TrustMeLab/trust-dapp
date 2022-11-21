import React, { FC, useEffect } from "react";
import { Box } from "@mui/material";
import WithAuthUser from "../../user/components/WithAuthUser";

export const Dashboard = () => {
  return (
    <WithAuthUser>
      <Box>Dashboard page</Box>
    </WithAuthUser>
  );
};
