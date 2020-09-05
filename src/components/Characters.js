import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import AnimatedModal from "./DetailModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 345,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      margin: ".7rem auto",
    },
    [theme.breakpoints.up("sm")]: {
      margin: ".7rem",
    },
    [theme.breakpoints.up("lg")]: {
      margin: ".7rem",
    },
  },
}));

const Characters = ({ character, value }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card key={character.id} className={classes.paper}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={character.name}
            image={character.image}
          />
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center" }}
            >
              <AnimatedModal character={character} value={value} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Characters;
