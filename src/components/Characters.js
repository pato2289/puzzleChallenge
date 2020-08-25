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

const Characters = ({ character }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card key={character.id} className={classes.root}>
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
              <AnimatedModal character={character} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Characters;
