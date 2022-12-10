import { Box } from "@mui/material";
import ViewArticleData from "../../components/Admin/ArticleData/ViewArticleData";
import Sidebar from "../../components/Nav/Sidebar";

function AdminArticle() {
  return (
    <Box>
      <Sidebar title={"Article"} component={<ViewArticleData />} />
    </Box>
  );
}

export default AdminArticle;
