import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        visibility: "true",
        position: "absolute",
        top: "40%",
        left: "50%",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <CircularProgress color="inherit" />
      </Box>
      <Typography>Loading...</Typography>
    </Box>
  );
}

export default Loading;
