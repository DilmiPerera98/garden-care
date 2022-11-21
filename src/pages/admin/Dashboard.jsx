import { Box } from "@mui/material";
import DashboardData from "../../components/Admin/DashboardData";
import Sidebar from "../../components/Nav/Sidebar";

function Dashboard() {
  return (
    <Box>
      <Sidebar title={"Dashboard"} component={<DashboardData/> }/>
    </Box>
  );
}

export default Dashboard;
