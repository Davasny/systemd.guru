import { theme } from '@chakra-ui/core';

// second definition of colors due to problems with TS
export const customTheme = {
  light: {
    strongText: '#000',
    subText: '#727272',
    subTitle: '#05042D',
  },
  dark: {
    strongText: '#FFF',
    subText: '#9a9a9a',
    subTitle: '#b5ab64',
  },
};

export default {
  ...theme,
  fonts: {
    body: 'Roboto Mono, monospace',
    heading: '"Roboto Mono", monospace',
    mono: 'Roboto Mono, monospace',
  },
  radii: {
    none: '0',
    sm: '0',
    md: '0',
    lg: '0',
    full: '0',
  },
  colors: {
    ...theme.colors,
    darkCheckbox: {
      200: customTheme.dark.subTitle,
    },
  },
};
