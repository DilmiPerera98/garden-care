import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

function ArticleCard(props) {
  return (
    <Grid item md={3}>
      <Card sx={{ maxWidth: "345px", minHeight: "20rem" }}>
        <CardMedia
          component="img"
          sx={{ minHeight: "18rem" }}
          image={props.article.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.article.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/readArticle/${props.article._id}`}>
            <Button size="small">See more...</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default ArticleCard;
