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
import AnimatedModal from "./CharacterModal";

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

const Locations = ({ location, value }) => {
  const classes = useStyles();

  let locationResidents = location.residents.slice(0, 5);

  //console.log("value en location: ", value);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card key={location.id} className={classes.paper}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={location.name}
            image="https://i.ytimg.com/vi/BSymgfwoAmI/maxresdefault.jpg"
          />
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center" }}
            >
              <AnimatedModal
                location={location}
                locationResidents={locationResidents}
                value={value}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Locations;
