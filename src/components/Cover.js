import React from "react";
import { Typography, Grid, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    margin: "1.5rem 0",
    fontFamily: "RickAndMorty",
  },
  paper: {
    maxWidth: 500,
    margin: ".7rem auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    textAlign: "center",
  },
}));

const Cover = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} lg={4} style={{ margin: "auto" }}>
          <Typography variant="h2" component="h1" className={classes.text}>
            Rick and Morty
          </Typography>
          <CardMedia
            component="img"
            alt="Cover"
            image="./portada.gif"
            className={classes.paper}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Cover;
