import { Box } from "@mui/material";
import GuidenceData from "../../components/Admin/GuidenceData";
import Sidebar from "../../components/Nav/Sidebar";

function AdminGuidence() {
  return (
    <Box>
      <Sidebar title={"Guidence"} component={<GuidenceData />} />
    </Box>
  );
}

export default AdminGuidence;
