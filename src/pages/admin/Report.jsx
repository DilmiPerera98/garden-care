import { Box } from "@mui/material";
import ViewReportData from "../../components/Admin/ReportData/ViewReportData";
import Sidebar from "../../components/Nav/Sidebar";

function Report() {
  return (
    <Box>
      <Sidebar title={"Report"} component={<ViewReportData/> }/>
    </Box>
  );
}

export default Report;