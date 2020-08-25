import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  inputBlock: {
    width: "90%",
    margin: "2rem auto",
    padding: ".7rem",
    borderRadius: ".5rem",
  },
});

const InputText = ({ onChange }) => {
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

export default InputText;
