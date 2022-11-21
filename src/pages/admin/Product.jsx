import { Box } from "@mui/material";
import ViewProductData from "../../components/Admin/ProductData/ViewProductData";
import Sidebar from "../../components/Nav/Sidebar";

function Product() {
  return (
    <Box>
      <Sidebar title={"Product"} component={<ViewProductData/> }/>
    </Box>
  );
}

export default Product;