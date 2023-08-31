import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Rating } from "@mui/material";
import React, { useState } from "react";
import PriceModal from "../Modal/PriceModal";

function Product(props) {
  const { product } = props;

  //handle more product details modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const productPrice = product.price - (product.price * product.discount) / 100;

  return (
    <Grid item md={2.4}>
      <Card sx={{ width: "16rem", height: "23rem" }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            image={product.img}
            alt="green iguana"
            sx={{ width: "16rem", height: "16rem" }}
          />
          <CardContent>
            {product.discount === 0 ? (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ color: product.discount === 0 ? "" : "red" }}
              >
                Rs. {product.price}.00{" "}
              </Typography>
            ) : (
              <Typography
                gutterBottom
                display="flex"
                variant="h6"
                component="div"
              >
                <s> Rs. {product.price}.00 </s>
                <Typography
                  variant="h7"
                  component="div"
                  sx={{ color: product.discount === 0 ? "" : "red" }}
                >
                  &nbsp;Rs.
                  {productPrice}
                  .00
                </Typography>
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              {product.productName}
            </Typography>

            <Rating
              name="half-rating"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />
          </CardContent>
        </CardActionArea>
        <PriceModal
          open={open}
          setOpen={setOpen}
          slug={product.slug}
          productPrice={productPrice}
        />
      </Card>
    </Grid>
  );
}
export default Product;
