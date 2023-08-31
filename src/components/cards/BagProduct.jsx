import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Store } from "../../store";

function BagProduct(props) {
  const bagproduct = props.item;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  //---------------------bagUpdateHandler-----------------
  const updateBagHandler = async (bagproduct, quantity) => {
    const { data } = await axios.get(`/api/products/${bagproduct._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry!Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "BAG_ADD_ITEM",
      payload: { ...bagproduct, quantity },
    });
  };

  //---------------------bagRemoveHandler-----------------
  const removeItemHandler = (bagproduct) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: bagproduct });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
      <CardMedia
        component="img"
        image={bagproduct.img}
        alt="green iguana"
        sx={{ width: "5rem", height: "5rem" }}
      />

      <Box width="300px" sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            color="text.secondary"
            sx={{ fontSize: 15, display: "flex", flexGrow: 1 }}
          >
            {bagproduct.productName}
          </Typography>
          <Typography display={"flex"} justifyContent="end">
            Rs. {bagproduct.price}.00
          </Typography>
        </Box>

        <ButtonGroup size="small" sx={{ mt: 1, mb: 1 }} color="inherit">
          <Button
            aria-label="reduce"
            disabled={bagproduct.quantity === 1}
            onClick={() =>
              updateBagHandler(bagproduct, bagproduct.quantity - 1)
            }
          >
            <FaMinus fontSize="small" />
          </Button>
          <Button disabled aria-label="increase">
            <Typography fontSize="small">{bagproduct.quantity}</Typography>
          </Button>
          <Button
            aria-label="increase"
            disabled={bagproduct.quantity === bagproduct.countInStock}
            onClick={() =>
              updateBagHandler(bagproduct, bagproduct.quantity + 1)
            }
          >
            <FaPlus fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => removeItemHandler(bagproduct)}
          >
            <FaTrashAlt fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default BagProduct;
