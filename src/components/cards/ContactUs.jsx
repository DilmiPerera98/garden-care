import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ContactUs() {
  return (
    <Card
      sx={{ backgroundColor: "#181a19", pl: 3, mt: "10vh", color: "white" }}
    >
      <h2>Contact Us</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "35vw" }}>
          <Typography>
            <b>Call Us</b>
          </Typography>
          <Typography>038 2249112</Typography>
        </Box>
        <Box sx={{ width: "35vw" }}>
          <Typography>
            <b>Address</b>
          </Typography>
          <Typography>avvbb</Typography>
          <Typography>vfdh</Typography>
        </Box>
        <Box sx={{ width: "35vw" }}>
          <Typography>
            <b>Email</b>
          </Typography>
          <Typography>038 2249112</Typography>
        </Box>
      </Box>
    </Card>
  );
}
export default ContactUs;
