import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 39.8,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 1,
    color: theme.palette.common.white,
    "&$checked": {
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#00BEE6",
        borderColor: "#00BEE6",
      },
    },
  },
  thumb: {
    width: 18,
    height: 18,
    boxShadow: "none",
  },
  track: {
    border: `1px solid #C5C5C5`,
    borderRadius: 17 / 2,
    opacity: 1,
    backgroundColor: "#C5C5C5",
  },
  checked: {},
}))(Switch);

export default function Toggle({ isToggled, setIsToggled }) {
  const handleChange = (event) => {
    setIsToggled(!isToggled);
  };

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <AntSwitch
            checked={isToggled}
            onChange={handleChange}
            name="checked"
          />
        </Grid>
      </Typography>
    </FormGroup>
  );
}
