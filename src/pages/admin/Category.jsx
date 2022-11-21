import { Box } from "@mui/material";
import ViewCategoryData from "../../components/Admin/CategoryData/ViewCategoryData";
import Sidebar from "../../components/Nav/Sidebar";

function Category() {
  return (
    <Box>
      <Sidebar title={"Category"} component={<ViewCategoryData/> }/>
    </Box>
  );
}

export default Category;