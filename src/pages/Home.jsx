import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ContactUs from "../components/cards/ContactUs";
import homeimg from "../Resources/home4.jpeg";
import above1 from "../Resources/above1.jpg";
import NewProducts from "./NewProducts";
import Shop from "./Shop";
export default function Home() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          height="80px"
          columns={{ xs: 4, sm: 4, md: 16 }}
          sx={{ fontFamily: "Averia Sans Libre, cursive" }}
        >
          <Grid item xs={8}>
            <Box className="indexImg">
              <img alt="HomePage" src={homeimg} />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <h1 className="topic">Garden Care</h1>
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

                    backgroundColor: "#24936B",
                  }}
                >
                  Join with Us
                </Button>
              </Link>
            </Box>
          </Grid>

          <Grid item md={16}>
            <h1>Newest Items:</h1>
            <NewProducts />
          </Grid>

          <Grid item md={16}>
            <ContactUs />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
