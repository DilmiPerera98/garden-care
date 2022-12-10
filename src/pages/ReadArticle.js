import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function ReadArticle() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "70vw" }}>
        <CardActionArea>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ m: "5px", p: "2px" }}
          >
            How to Care for Snake Plant
          </Typography>
          <CardMedia
            component="img"
            sx={{ height: "50vh", mt: "1rem" }}
            image="https://post.healthline.com/wp-content/uploads/2020/09/Male_Indoor_Plants_732x549-thumbnail-732x549.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography
              sx={{ mt: "1rem" }}
              variant="body2"
              color="text.secondary"
            >
              Snake plants, also known as “Mother-in-Law’s Tongue” and
              Sansevieria, are one of the easiest houseplants to take care of.
              This succulent plant is very forgiving and perfect for beginners.
              Here’s how to care for a snake plant in your home!  Native to
              southern Africa, snake plants are well adapted to conditions
              similar to those in southern regions of the United States. Because
              of this, they may be grown outdoors for part of all of the year in
              USDA zones 8 and warmer. However, they spread by sending out
              underground runners and may become invasive, so treat snake
              plants like you would bamboo; plant it only in contained areas
              or pots. Too much water and freezing temperatures are two of the
              very few things that can really affect this plant in a significant
              way. Soggy soil will cause root rot and extended exposure to cold
              temperatures can damage the foliage.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
