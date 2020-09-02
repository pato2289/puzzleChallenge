import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  inputBlock: {
    width: "90%",
    margin: "1.5rem auto",
    padding: ".7rem",
    borderRadius: ".5rem",
  },
});

const InputText = ({ onChange, inputValue }) => {
  const classes = useStyles();
  return (
    <>
      <input
        className={classes.inputBlock}
        type="text"
        name="inputName"
        onChange={onChange}
        placeholder="Enter a name o location (lowercase)"
        value={inputValue}
      />
    </>
  );
};

export default InputText;
