import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

export default function Hero4() {
	const theme = useTheme();

  return (
    <Box
      sx={{
        height: "28em",
        bgcolor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mt: "1.5em", mb: "1.6em", fontSize: "3em" }}>Powered by</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "65%",
          height: "100%",
        }}
      >
        <Box
          component="img"
          sx={{
            padding: "10px",
            height: "14%",
          }}
          alt="starton"
          src={"/starton.png"}
        />
        <Box
          component="img"
          sx={{
            mt: "-1.5em",
            padding: "10px",
            height: "25%",
          }}
          alt="iExec"
          src={"/iExec.png"}
        />
        <Box
          component="img"
          sx={{
            padding: "10px",
            height: "15%",
          }}
          alt="nodereal"
          src={"/nodereal.png"}
        />
        <Box
          component="img"
          sx={{
            padding: "10px",
            height: "16%",
          }}
          alt="ledger"
          src={"/ledger.png"}
        />
      </Box>
    </Box>
  );
}
