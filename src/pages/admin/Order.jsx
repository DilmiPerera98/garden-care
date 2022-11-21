import { Box } from "@mui/material";
import ViewOrderData from "../../components/Admin/OrderData/ViewOrderData";
import Sidebar from "../../components/Nav/Sidebar";

function Order() {
  return (
    <Box>
      <Sidebar title={"Order"} component={<ViewOrderData/> }/>
    </Box>
  );
}

export default Order;