import { Box, useColorMode } from '@chakra-ui/core';
import { Formik, useFormikContext } from 'formik';
import React from 'react';

import OnCalendarSelectPeriod from './OnCalendarSelectPeriod';

const OnCalendar = () => {
  return (
    <Formik
      initialValues={
        {
          year: ['*'], year_text: '*',
          month: ['*'], month_text: '*',
          day: ['*'], day_text: '*',
          hour: ['*'], hour_text: '*',
          minute: ['*'], minute_text: '*',
          second: ['*'], second_text: '*',
        }
      }

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <OnCalendarForm/>
    </Formik>
  );
};


const OnCalendarForm: React.FC = () => {
  const { colorMode } = useColorMode();
  const { setFieldValue, values, handleSubmit } = useFormikContext();
  const possibleValues = {
    year: ['*', '2020', '2021', '2022', '2023', '2024', '2025'],
    month: ['*'].concat(Array.from(Array(12).keys(), n => (n + 1).toString())),
    day: ['*'].concat(Array.from(Array(31).keys(), n => (n + 1).toString())),
    hour: ['*'].concat(Array.from(Array(24).keys(), n => n.toString())),
    minute: ['*'].concat(Array.from(Array(60).keys(), n => (n).toString())),
    second: ['*'].concat(Array.from(Array(60).keys(), n => (n).toString())),
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display={{ md: 'flex' }}>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='year' step={1}/>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='month' step={1}/>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='day' step={1}/>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='hour' step={1}/>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='minute' step={1}/>
        <OnCalendarSelectPeriod possibleValues={possibleValues} fieldName='second' step={1}/>
      </Box>
      <button type="submit">submit (remove in future)</button>
    </form>
  );
};

export default OnCalendar;
