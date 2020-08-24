import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  inputBlock: {
    width: "90%",
    margin: "1rem auto",
    padding: ".5rem",
    borderRadius: ".5rem",
  },
});

const InputCharacter = ({ onChange }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <input
          className={classes.inputBlock}
          type="text"
          name="inputName"
          onChange={onChange}
          placeholder="Enter a name o location (lowercase)"
        />
      </Grid>
    </>
  );
};

export default InputCharacter;
