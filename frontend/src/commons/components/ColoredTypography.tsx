import React, { PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";

export const ColoredTypography = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  return (
    <span
      style={{
        color: theme.palette.primary.main,
      }}
    >
      {children}
    </span>
  );
};
