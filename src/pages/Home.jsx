import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import homeimg from "../Resources/home4.jpeg";
export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 4, md: 16 }}
          sx={{ fontFamily: "Averia Sans Libre, cursive" }}
        >
          <Grid item xs={8}>
            <Box className="indexImg">
              <img alt="HomePage" src={homeimg} />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <h1 className="topic">Gargen Care</h1>
            <h3>
              Our website is here for anyone looking for success with their
              indoor gardening or help getting their houseplants to thrive.
            </h3>

            <h3>
              With full guides and extensive information about most popular
              indoor plants, from the beginner to the more experienced, there's
              something for everyone.
            </h3>

            <h3>
              We want your plants to prosper and for you to enjoy this hobby for
              years to come. We'll help you do this with our Plant Profiles,
              Care Guides, Helpful Tips, Problem Sections, Personal Experiences,
              and Your Comments
            </h3>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                paddingRight: "27px",
                paddingTop: "1rem",
                marginTop: "0.2rem",
              }}
            >
              <Link to={"/signIn"} variant="body2">
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "#A0D5C2",
                    },
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#24936B",
                  }}
                >
                  Join Us
                </Button>
              </Link>
            </Box>
          </Grid>
          {/* <Card sx={{backgroundColor:"#181a19",p:5,mt:"10vh",color:"white" ,display: "flex", flexDirection: "row",width:"98vw"}}>         
                <Grid item xs={8} md={5} sx={{display: "flex",justifyContent:"center"}}>
                  <Typography>Call Us</Typography><br/>
                  <Typography>038 2249112</Typography>
                </Grid>
                <Grid xs={12} item md={5} sx={{display: "flex",justifyContent:"center"}}>
                  <Typography>Address</Typography>
                  <Typography>avvbb</Typography>
                  <Typography>vfdh</Typography>
                </Grid>
                <Grid item xs={12} md={5} sx={{display: "flex",justifyContent:"center"}}>
                  <Typography>Email</Typography>
                  <Typography>038 2249112</Typography>
                </Grid>

          </Card> */}
          <Grid item md={16}>
            <Card sx={{backgroundColor:"#181a19",pl:3,mt:"10vh",color:"white"}}>
              <h2>Contact Us</h2>
              <Box sx={{ display: "flex", flexDirection: "row",justifyContent:"center"}}>
                <Box sx={{width:"35vw"}}>
                  <Typography>Call Us</Typography>
                  <Typography>038 2249112</Typography>
                </Box>
                <Box sx={{width:"35vw"}}>
                  <Typography>Address</Typography>
                  <Typography>avvbb</Typography>
                  <Typography>vfdh</Typography>
                </Box>
                <Box sx={{width:"35vw"}}>
                  <Typography>Email</Typography>
                  <Typography>038 2249112</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
