import {Card} from "@mui/material";
import Charts from 'react-apexcharts'

function MonthlySales(){
    return(

          <Card elevation={1}>
            <Charts
              type="bar"
              options={{
                chart: {
                  id: "basic-bar",
                  height: "200vh",
                },
                xaxis: {
                  categories: ["1","2","3","4","5","6","7","8","9","10","11",],
                  /* categories: ["1","2","3","4","5","6","7","8","9","10","11",], */
                },
                title: {
                  text: "Monthly Sales",
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
              }}
              series={[
                {
                  name: "series-1",
                  data: [12000, 10000, 20000, 8000, 13000,12000, 10000, 20000, 8000, 13000,10000, 20000],
                },
              ]}
            />
            </Card>

    );
}

export default MonthlySales;