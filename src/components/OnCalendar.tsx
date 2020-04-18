import { Box, Checkbox, CheckboxGroup, FormControl, Input } from '@chakra-ui/core';
import { Formik, useFormikContext } from 'formik';
import React from 'react';

const OnCalendar = () => {
  return (
    <Formik
      initialValues={
        { year: ['*'], year_text: '*' }
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

interface Pair {
  start?: number,
  end?: number
}

// function that changes 1,2,3 to 1..3 and etc
const parsePeriods = (periods: Array<string>): Array<Pair> => {
  const periodsSorted = periods.sort().map(x => {
    return parseInt(x, 10);
  });

  let i = 0;
  let result: Array<Pair> = [];
  let pair: Pair = { start: periodsSorted[i], end: periodsSorted[i] };

  if (periodsSorted.length > 1) {
    while (i < periodsSorted.length - 1) {
      const diff = periodsSorted[i + 1] - periodsSorted[i];
      if (diff === 1) pair.end = periodsSorted[i + 1];
      else {
        result.push(pair);
        pair = { start: periodsSorted[i + 1], end: periodsSorted[i + 1] };
      }
      i += 1;
    }
    result.push(pair);
  } else if (pair.start !== undefined) {
    [pair.start] = periodsSorted;
    pair.end = pair.start;
    result.push(pair);
  } else
    result = [];
  return result;
};

// function that changes array of periods to nice string used by systemd
const createSystemdString = (periods: Array<Pair> | undefined): string => {
  if (periods !== undefined && periods.length > 0) {
    const text = periods.map(pair => {
      if (pair.start === pair.end)
        return `${pair.start},`;
      return `${pair.start}..${pair.end},`;
    });
    return text.join('').slice(0, -1);
  }
  return '*';
};

const OnCalendarForm: React.FC = () => {
  const { setFieldValue, values, handleSubmit } = useFormikContext();
  const possibleValues = { year: ['*', '2020', '2021', '2022', '2023', '2024'] };

  const handleCheckbox = (e): void => {
    const newValue = e.target.value;
    const fieldName =  e.target.name;
    let storedValue = values[fieldName];

    if (newValue === '*') {
      setFieldValue(fieldName, ['*']);
      setFieldValue(`${fieldName}_text`, createSystemdString(undefined));
    } else {
      // remove star if clicked anything else
      storedValue = storedValue.filter(item => item !== '*');

      // remove from list
      if (storedValue.includes(newValue)) {
        storedValue = storedValue.filter(item => item !== newValue);
        setFieldValue(fieldName, storedValue);
      } else {
        // append to list
        storedValue.push(newValue);
        setFieldValue(fieldName, storedValue);
      }

      // if everything unchecked
      if (storedValue.length === 0)
        setFieldValue(fieldName, ['*']);

      setFieldValue(`${fieldName}_text`, createSystemdString(parsePeriods(storedValue)));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box w={200}>
          <FormControl>
            <Input
              type="text"
              name="name"
              padding="5px"
              value={values.year_text}
            />
            <Box
              borderWidth="1px"
              padding="3px"
            >
              <CheckboxGroup spacing={2}>
                {possibleValues.year.map((item) => (
                  <label htmlFor={item}>
                    <Checkbox
                      key={item}
                      name="year"
                      value={item}
                      onChange={handleCheckbox}
                      variantColor="gray"
                      isChecked={values.year.includes(item)}
                    >
                      {item === '*' ? 'all' : item}
                    </Checkbox>
                  </label>
                ))}
              </CheckboxGroup>
            </Box>
            <button type="submit">Submit</button>
          </FormControl>
        </Box>
      </form>
    </div>
  );
};

export default OnCalendar;
