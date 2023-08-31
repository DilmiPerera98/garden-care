import { Grid, Paper } from "@mui/material";
import SummaryCard from "../cards/SummaryCard";
import MonthlySales from "../Charts/MonthlySales";
import CategorySales from "../Charts/CategorySales";
import { useReducer } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getError } from "../../utils";
import { Store } from "../../store";
import Loading from "../Loading";
import Message from "../Message";
import { useState } from "react";
import ViewOrderData from "./OrderData/ViewOrderData";

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function DashboardData() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  //initialize the arrays to store the sales data in monthly sales
  const [salesLabel, setSalesLabel] = useState([]);
  const [salesCount, setSalesCount] = useState([]);

  //initialize the arrays to store the sales data in product wise sales
  const [categoryLabel, setCategoryLabel] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);

  //fetching the data from the back end
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/orders/admin/dashboard/summary`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        let salesLabelArray = [];
        let salesCounrArray = [];
        let categoryLabelArray = [];
        let categoryCounrArray = [];
        console.log(data);

        //store the data to the monthly sales
        data.dailyOrders.map((list) => {
          salesLabelArray.push(list._id);
          salesCounrArray.push(list.sales);
        });

        //store the data to the product wise sales
        data.productCategories.map((list) => {
          categoryLabelArray.push(list._id);
          categoryCounrArray.push(list.count);
        });

        setSalesLabel(salesLabelArray);
        setSalesCount(salesCounrArray);
        setCategoryLabel(categoryLabelArray);
        setCategoryCount(categoryCounrArray);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <Grid
      container
      rowSpacing={{ xs: 2 }}
      columnSpacing={{ xs: 2 }}
      width="100%"
      justifyContent={"center"}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Grid item xs={12}>
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
              mt: 3,
            }}
          >
            <Grid item xs={12} md={3}>
              <SummaryCard
                title={"Users"}
                number={
                  summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SummaryCard
                title={"Orders"}
                number={
                  summary.orders && summary.orders[0]
                    ? summary.orders[0].numOrders
                    : 0
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SummaryCard
                title={"Total Sales"}
                number={
                  summary.orders && summary.users[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <SummaryCard
                title={"Daily Sales"}
                number={
                  summary.dailySales && summary.dailySales[0]
                    ? summary.dailySales[0].sales.toFixed(2)
                    : 0
                }
              />
            </Grid>
          </Paper>
        </Grid>
      )}
      <Grid item xs={6}>
        <MonthlySales categories={salesLabel} data={salesCount} />
      </Grid>

      <Grid item xs={6}>
        <CategorySales categories={categoryLabel} data={categoryCount} />
      </Grid>

      <Grid item xs={12}>
        <ViewOrderData />
      </Grid>
    </Grid>
  );
}

export default DashboardData;
