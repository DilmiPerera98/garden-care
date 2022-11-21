import {Grid, Paper } from "@mui/material";
import SummaryCard from "../cards/SummaryCard";
import { Summary_Count } from "../../data/SummaryData";
import MonthlySales from "../Charts/MonthlySales";
import CategorySales from "../Charts/CategorySales";

function DashboardData() {
  return (
    
      <Grid
        container
        rowSpacing={{ xs: 2 }}
        columnSpacing={{ xs: 2 }}
        width="100%"
        justifyContent={"center"}
      >
        <Paper
        sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            position: "sticky",
            top: 0,
            zIndex: 50,
            maxHeight: "100%",
            flexDirection: "row",
            mt:3
          }}
        >
          {Summary_Count.map(({ label, count, id }, index) => (
            <Grid item xs={12} md={3}>
            <SummaryCard title={label} number={count} key={id} />
            </Grid>
          ))}
        </Paper>

        <Grid item xs={6}   >
            <MonthlySales />
          </Grid>
        
          <Grid item xs={6} >
            <CategorySales />
          </Grid>


        </Grid>


  );
}

export default DashboardData;
