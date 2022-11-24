import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

interface SmallCardProps {
  period: string;
  rentInfos: string | number;
  handleClick: () => void;
}
export const SmallCard = ({
  period, //calculated
  rentInfos,
  handleClick,
}: SmallCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        padding: "8px",
        cursor: "pointer",
        width: "240px",
        height: "160px",
        justifyContent: "space-around",
        alignItems: "center",
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        },
      }}
      onClick={handleClick}
    >
      <Typography variant="h6" sx={{ fontWeight: "light" }}>
        {period}
      </Typography>
      <Typography variant="h5">{rentInfos}</Typography>
    </Card>
  );
};
