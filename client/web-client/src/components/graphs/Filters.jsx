import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';
import { mapIdToRegion } from '../../res/mapCodeToNameRegion';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    width: 'clamp(16rem, 90vw, 70rem)',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
}));

export const Filters = ({
  classAgesProps, refetch, geolocation,
}) => {
  const [classAges, setClassAges] = useState(classAgesProps);
  const [currentRegion, setCurrentRegion] = useState('00');
  const codeRegions = ['00', '01', '02', '03', '04', '06', '11', '24', '27', '28', '32', '44', '52', '53', '75', '76', '84', '93', '94', '975', '977', '978'];
  const {
    handleSubmit, control,
  } = useForm();

  useEffect(() => {
    if (geolocation) {
      setCurrentRegion(geolocation.toString());
    } else {
      setCurrentRegion('00');
    }
  }, [geolocation]);

  const classes = useStyles();
  const sinceDate = new Date();
  sinceDate.setMonth(sinceDate.getMonth() - 1);

  const handleChange = (event) => {
    setClassAges(event.target.value);
  };

  const handleChangeRegion = (event) => {
    setCurrentRegion(event.target.value);
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

    refetch({
      queryParams:
      {
        ...(currentRegion !== '00') && { reg: currentRegion },
        since: `${data.since}`,
        to: `${data.to}`,
        class_age: `${data.classAge}`,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="space-around" className={classes.grid}>

        <FormControl className={classes.formControl}>
          <InputLabel id="class-age-label">Classe d&apos;âge</InputLabel>
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

        <FormControl className={classes.formControl}>
          <InputLabel id="reg-label">Régions</InputLabel>
          <Controller
            control={control}
            id="reg"
            name="reg"
            render={(
              {
                name,
              },
            ) => (
              <Select
                name={name}
                value={currentRegion}
                onChange={(e) => handleChangeRegion(e)}
              >
                {codeRegions.map((code) => (
                  <MenuItem key={code} value={code}>{mapIdToRegion[code]}</MenuItem>
                ))}
              </Select>
            )}
          />

        </FormControl>

        <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
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
            label="Depuis"
            onChange={handleSinceDateChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
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
            label="Jusqu'au"
            onChange={handleToDateChangeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <Button type="submit" color="secondary">Envoyer</Button>

      </Grid>
    </form>
  );
};

Filters.defaultProps = {
  classAgesProps: [],
  geolocation: null,
  refetch: () => { },
};

Filters.propTypes = {
  classAgesProps: PropTypes.arrayOf(
    PropTypes.number,
  ),
  geolocation: PropTypes.number,
  refetch: PropTypes.func,
};
