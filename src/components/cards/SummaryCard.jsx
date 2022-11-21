import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const SummaryCard = ({ title, number, color, titleStyle, numberStyle }) => {
  console.log(color);
  return (
    
      <Card sx={{ width:"240px", height:"120px", backgroundColor: "#A0D5C2", margin: 3 ,border:1,borderColor:"#24936B"}}>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {number}
          </Typography>
          {/* <InsertLinkOutlinedIcon sx={{ marginLeft: "13rem" }} /> */}
        </CardContent>
      </Card>

  );
};

export default SummaryCard;
