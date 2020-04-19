import { Box, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, useColorMode } from '@chakra-ui/core';
import { FastField, useFormikContext } from 'formik';
import React from 'react';

import { customTheme } from '../gatsby-plugin-chakra-ui/theme';

interface Pair {
  start?: number,
  end?: number
}

// function that changes 1,2,3 to 1..3 and etc
const parsePeriods = (periods: Array<string>, step: number): Array<Pair> => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

  const periodsSorted = periods.map((x: string) => {
    return parseInt(x, 10);
  }).sort(collator.compare);

  let i = 0;
  let result: Array<Pair> = [];
  let pair: Pair = { start: periodsSorted[i], end: periodsSorted[i] };

  if (periodsSorted.length > 1) {
    while (i < periodsSorted.length - 1) {
      const diff = periodsSorted[i + 1] - periodsSorted[i];
      if (diff === step) pair.end = periodsSorted[i + 1];
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

const CustomCheckbox: React.FC = (props) => (
  <Checkbox name={props.field.name} {...props}/>
);


const OnCalendarSelectPeriod: React.FC = (props) => {
  const { colorMode } = useColorMode();
  const possibleValues = props.possibleValues;
  const { setFieldValue, values } = useFormikContext();

  const fieldName = props.fieldName;

  const handleCheckbox = (e): void => {
    const newValue = e.target.value;
    const fieldName = e.target.name;
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

      setFieldValue(`${fieldName}_text`, createSystemdString(parsePeriods(storedValue, props.step)));
    }
  };

  return (
    <Box maxW="150px" m="5px">
      <FormControl>
        <FormLabel htmlFor={`${fieldName}Text`} color={customTheme[colorMode].subText}>{fieldName}</FormLabel>
        <Input
          type="text"
          name={`${fieldName}Text`}
          padding="5px"
          value={values[`${fieldName}_text`]}
        />
        <Box
          borderWidth="1px"
          padding="3px"
        >
          <CheckboxGroup spacing={2} maxH="200px" overflowY="auto">
            {possibleValues[fieldName].map((item) => (
              <label htmlFor={`${fieldName}_${item}`}>
                <FastField
                  component={CustomCheckbox}
                  key={`${fieldName}_${item}`}
                  name={fieldName}
                  value={item}
                  variantColor="gray"
                  onChange={handleCheckbox}
                  isChecked={values[fieldName].includes(item)}
                >{item === '*' ? 'all' : item}</FastField>
              </label>
            ))}
          </CheckboxGroup>
        </Box>
      </FormControl>
    </Box>
  );
};


export default OnCalendarSelectPeriod;
