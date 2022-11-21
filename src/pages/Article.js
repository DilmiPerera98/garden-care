import { Card, Grid } from "@mui/material";
import ArticleCard from "../components/cards/ArticleCard";

export default function Home() {
  return (
      <Grid container md={16} spacing={5}>
        <Grid item md={3}><ArticleCard/></Grid>
        <Grid item md={3}><ArticleCard/></Grid>
        <Grid item md={3}><ArticleCard/></Grid>
        <Grid item md={3}><ArticleCard/></Grid>
        <Grid item md={3}><ArticleCard/></Grid>
        <Grid item md={3}><ArticleCard/></Grid>
      </Grid>
      
  );
}
