import { Box } from "@mui/material";
import ViewInventoryData from "../../components/Admin/InventoryData/ViewInventoryData";
import Sidebar from "../../components/Nav/Sidebar";

function Inventory() {
  return (
    <Box>
      <Sidebar title={"Inventory"} component={<ViewInventoryData/> }/>
    </Box>
  );
}

export default Inventory;