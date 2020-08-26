import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
    padding: "1rem",
    border: "1px solid black",
  },
});

export default function CheckButtons({ setValue, value }) {
  const classes = useStyles();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend">Filters</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="character"
          control={<Radio />}
          label="Character"
        />
        <FormControlLabel
          value="location"
          control={<Radio />}
          label="Location"
        />
        <FormControlLabel value="episode" control={<Radio />} label="Episode" />
      </RadioGroup>
    </FormControl>
  );
}
