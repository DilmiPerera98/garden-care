import { Box, Typography } from "@mui/material";

function TotalPrice() {
  return (
    <Box>
      <Box sx={{ mt: 3, display: "flex", alignContent: "center" }}>
        <Typography sx={{ display: "flex", flexGrow: 1 }}>Sub Total</Typography>
        <Typography sx={{ display: "flex", justifyItems: "end" }}>
          Rs. 1500.00
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <Typography sx={{ display: "flex", flexGrow: 1 }}>Shipping</Typography>
        <Typography sx={{ display: "flex", justifyItems: "end" }}>
          Rs. 200.00
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: "flex", alignContent: "center" }}>
        <Typography sx={{ fontSize: 20, display: "flex", flexGrow: 1 }}>
          Total
        </Typography>
        <Typography sx={{ fontSize: 18, display: "flex", justifyItems: "end" }}>
          Rs. 1700.00
        </Typography>
      </Box>
    </Box>
  );
}

export default TotalPrice;
