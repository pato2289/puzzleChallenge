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

let defaultImage =
  "https://static.highsnobiety.com/thumbor/hxMUNdfLGfmy_UEHCUhA_SUevnA=/fit-in/1200x720/smart/static.highsnobiety.com/wp-content/uploads/2019/07/11141629/enter-rick-morty-contest-02.jpg";

const Episodes = ({ episode, value }) => {
  const classes = useStyles();

  let episodeResidents = episode.characters.slice(0, 5);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card key={episode.id} className={classes.paper}>
        <CardActionArea>
          <CardMedia component="img" alt={episode.name} image={defaultImage} />
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center" }}
            >
              <AnimatedModal
                episode={episode}
                value={value}
                episodeResidents={episodeResidents}
                image={defaultImage}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Episodes;
