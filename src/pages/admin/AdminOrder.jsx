import { Box } from "@mui/material";
import OrderProducts from "../../pages/Order";
import Sidebar from "../../components/Nav/Sidebar";

function AdminOrder() {
  return (
    <Box>
      <Sidebar title={"Order Details"} component={<OrderProducts />} />
    </Box>
  );
}

export default AdminOrder;
