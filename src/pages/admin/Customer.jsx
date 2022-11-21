import { Box } from "@mui/material";
import ViewCustomerData from "../../components/Admin/CustomerData/ViewCustomerData";
import Sidebar from "../../components/Nav/Sidebar";

function Customer() {
  return (
    <Box>
      <Sidebar title={"Customer"} component={<ViewCustomerData/> }/>
    </Box>
  );
}

export default Customer;