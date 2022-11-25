import { Box } from "@mui/material";

export default function Hero4() {
  return (
    <Box
      sx={{
        mt: "3em", // a voir selon préférences
        height: "28em",
        bgcolor: "#FAFAFC",
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
          width: "80%",
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
            height: "15%",
          }}
          alt="ledger"
          src={"/ledger.png"}
        />
      </Box>
    </Box>
  );
}
