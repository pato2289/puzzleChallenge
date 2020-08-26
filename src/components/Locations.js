import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import AnimatedModal from "./CharacterModal";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "1rem",
  },
});

const Locations = ({ location, value }) => {
  const classes = useStyles();

  let residents = location.residents.slice(0, 5);

  console.log("value en location: ", value);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card key={location.id} className={classes.root}>
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
                residents={residents}
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
