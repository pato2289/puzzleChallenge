import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
  title: {
    margin: "1rem",
  },
  image: {
    maxWidth: 345,
  },
}));

export default function AnimatedModal({
  character,
  location,
  value,
  residents,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  console.log("value en modal:", value);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("resi", residents);

  return (
    <div>
      <Button onClick={handleOpen}>
        <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
          {value === "character"
            ? character.name.length > 12
              ? character.name.substr(0, 12) + "..."
              : character.name
            : location.name.length > 12
            ? location.name.substr(0, 12) + "..."
            : location.name}
        </Typography>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {value === "character" ? character.name : location.name}
            </Typography>
            <CardMedia
              className={classes.image}
              component="img"
              alt={value === "character" ? character.name : location.name}
              image={
                value === "character"
                  ? character.image
                  : "https://i.ytimg.com/vi/BSymgfwoAmI/maxresdefault.jpg"
              }
            />
            <Typography variant="h6" component="h6" className={classes.title}>
              {value === "character" ? (
                <p>
                  {" "}
                  - Specie: {character.species} <br />- Gender:{" "}
                  {character.gender} <br />- Type: {character.type} <br />{" "}
                </p>
              ) : (
                <p>
                  {" "}
                  - Type: {location.type} <br />- Dimension:{" "}
                  {location.dimension} <br />- Residents:
                  {residents.map((resident) => (
                    <p>{resident.name}</p>
                  ))}
                  <br />{" "}
                </p>
              )}
            </Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
