import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function ArticleCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://post.healthline.com/wp-content/uploads/2020/09/Male_Indoor_Plants_732x549-thumbnail-732x549.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          How to Plant Snake Plants · Choose a pot with a drainage hole in the
          bottom. Terra cotta pots work well for snake plants, since they allow
          the soil to dry...
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/readArticle"}>
          <Button size="small">See more...</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
export default ArticleCard;
