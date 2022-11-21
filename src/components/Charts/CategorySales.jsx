import {Card} from "@mui/material";
import Charts from 'react-apexcharts'


function CategorySales(){
    return(
          <Card elevation={1}>
            <Charts 
              type="donut"
              options={{
                chart: {
                  id: "basic-bar",
                  height: "200vh",
                },
                title: {
                  text: "Category wise sales",
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
                labels: ["Plants", "Pots", "Tools","Fertilizer"],
              }}
              series={[15000, 2500, 5000,8300]}
              width="100%"
              height="370px"
            />
            </Card>
    );
}

export default CategorySales;