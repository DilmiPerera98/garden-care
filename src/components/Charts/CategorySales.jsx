import { Card } from "@mui/material";
import Charts from "react-apexcharts";

function CategorySales(props) {
  console.log(props.data);
  return (
    <Card elevation={1}>
      <Charts
        type="donut"
        options={{
          chart: {
            id: "basic-bar",
            height: "200vh",
          },
          title: {
            text: "Category Sales",
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#263238",
            },
          },
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
              },
            },
          },
          labels: props.categories,
        }}
        series={props.data}
        width="100%"
        height="300px"
      />
    </Card>
  );
}

export default CategorySales;
