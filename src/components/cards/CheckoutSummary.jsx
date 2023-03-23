import { Box, CardMedia, Divider, Grid, Typography } from "@mui/material";

function CheckoutSummary(props) {
  const { items } = props;

  const itemsPrice = items.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = props.shippingPrice;

  const totalPrice = itemsPrice + shippingPrice;

  return (
    <Grid item xs={12}>
      <Typography sx={{ fontSize: 20, mt: 1, mb: 1 }} textAlign="center">
        Summary
      </Typography>

      {items.map((item) => (
        <Box
          key={item.slug}
          sx={{ display: "flex", alignItems: "center", m: 1 }}
        >
          <CardMedia
            component="img"
            image={item.img}
            alt="green iguana"
            sx={{ width: "3rem", height: "3rem" }}
          />
          <Box
            width="50vw"
            sx={{ display: "flex", flexDirection: "column", ml: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ display: "flex", flexGrow: 1 }}>
                {item.productName}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  maxWidth: "3.5vw",
                  minWidth: "3.5 vw",
                }}
              >
                {item.quantity}
              </Typography>
              <Typography
                display={"flex"}
                justifyContent="end"
                sx={{ maxWidth: "8vw", minWidth: "7vw" }}
              >
                Rs. {item.price * item.quantity}.00
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}

      <Divider variant="middle" />
      <Box>
        <Box sx={{ mt: 3, display: "flex", alignContent: "center" }}>
          <Typography sx={{ display: "flex", flexGrow: 1 }}>
            Sub Total
          </Typography>
          <Typography sx={{ display: "flex", justifyItems: "end" }}>
            Rs. {itemsPrice}.00
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignContent: "center" }}>
          <Typography sx={{ display: "flex", flexGrow: 1 }}>
            Shipping
          </Typography>
          <Typography sx={{ display: "flex", justifyItems: "end" }}>
            Rs. {shippingPrice}.00
          </Typography>
        </Box>
        <Box sx={{ mt: 3, display: "flex", alignContent: "center" }}>
          <Typography sx={{ fontSize: 20, display: "flex", flexGrow: 1 }}>
            Total
          </Typography>
          <Typography
            sx={{ fontSize: 18, display: "flex", justifyItems: "end" }}
          >
            Rs. {totalPrice}.00
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default CheckoutSummary;
