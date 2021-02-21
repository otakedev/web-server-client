import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    width: '30vw',
    minWidth: '30rem',
  },
}));

export const Filters = ({ classAgesProps, setData }) => {
  const {
    handleSubmit, control,
  } = useForm();

  const [classAges, setClassAges] = useState(classAgesProps);

  const classes = useStyles();
  const sinceDate = new Date();
  sinceDate.setMonth(sinceDate.getMonth() - 1);

  const handleChange = (event) => {
    setClassAges(event.target.value);
  };

  const [selectedSinceDate, setSelectedSinceDate] = React.useState(new Date());

  const handleSinceDateChangeDate = (date) => {
    setSelectedSinceDate(date);
  };

  const [selectedToDate, setSelecteToDate] = React.useState(new Date());

  const handleToDateChangeDate = (date) => {
    setSelecteToDate(date);
  };

  const onSubmit = (data) => {
    data.since.setHours(0, 0, 0);
    data.to.setHours(0, 0, 0);

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0/incidences?class_age=${data.classAge}&since=${data.since}&to=${data.to}`)
      .then((response) => response.json())
      .then((classAge) => {
        setData(classAge);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="space-around" className={classes.grid}>
        <FormControl className={classes.formControl}>
          <InputLabel id="class-age-label">Class age</InputLabel>
          <Controller
            as={Select}
            id="class-age"
            name="classAge"
            labelId="class-age-label"
            control={control}
            defaultValue={classAges[0]}
            onChange={handleChange}
          >
            {classAges.map((classAge) => (
              <MenuItem key={classAge} value={classAge}>{classAge}</MenuItem>
            ))}
          </Controller>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            as={KeyboardDatePicker}
            disableToolbar
            name="since"
            control={control}
            defaultValue={sinceDate}
            value={selectedSinceDate}
            variant="inline"
            format="dd/MM/yyyy"
            id="since-date-picker"
            label="Since"
            onChange={handleSinceDateChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            as={KeyboardDatePicker}
            disableToolbar
            name="to"
            control={control}
            defaultValue={selectedToDate}
            value={selectedToDate}
            variant="inline"
            format="dd/MM/yyyy"
            id="to-date-picker"
            label="To"
            onChange={handleToDateChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button type="submit" color="primary">Envoyer</Button>
      </Grid>
    </form>
  );
};

Filters.defaultProps = {
  classAgesProps: [],
};

Filters.propTypes = {
  classAgesProps: PropTypes.arrayOf(
    PropTypes.number,
  ),
};

Filters.defaultProps = {
  setData: PropTypes.func,
};

Filters.propTypes = {
  setData: PropTypes.func,
};
