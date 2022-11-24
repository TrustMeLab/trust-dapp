import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Lease } from "../../repositories/TrustAPI/types";

interface LargeCardProps {
  title: string;
  period: string;
  rentInfos: string | number;
  generalInfo: string;
  remarks?: string;
  buttons?: React.ReactNode;
  buttonTitle?: string;
  lease: Lease;
  handleClickButton?: (e: React.MouseEvent) => void;
}
export const LeaseDetailCard = ({
  title,
  period, //calculated
  rentInfos,
  generalInfo,
  remarks,
  buttons,
  buttonTitle,
  lease,
  handleClickButton,
}: LargeCardProps) => {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          display: "flex",
          borderRadius: "10px",
          padding: "32px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
          },
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: 6,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography variant="h5">{rentInfos}</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "light" }}>
            {period}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Typography variant="h5">{generalInfo}</Typography>
        </Box>
        <Box
          marginLeft={6}
          sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {/*<Button variant="outlined" onClick={handleClick}>*/}
          {/*  Go to Lease Payments*/}
          {/*</Button>*/}
          <Box sx={{ display: "flex" }}>
            {remarks && (
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.secondary, marginRight: "8px" }}
              >
                {remarks}
              </Typography>
            )}
            {buttons
              ? buttons
              : buttonTitle && (
                  <Button variant="outlined" onClick={handleClickButton}>
                    {buttonTitle}
                  </Button>
                )}
          </Box>
        </Box>
      </Card>
    </>
  );
};
