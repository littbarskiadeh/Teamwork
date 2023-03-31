import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Form() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gender: '',
    jobRole: '',
    department: '',
    address: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <form>
       <FormControl className={classes.formControl}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          name="gender"
          value={state.gender}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Job Role"
        name="jobRole"
        value={state.jobRole}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Department"
        name="department"
        value={state.department}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={state.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    </form>
  );
}
