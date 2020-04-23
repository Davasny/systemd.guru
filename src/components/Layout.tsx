import { Box, Button, Heading, useColorMode } from '@chakra-ui/core';
import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet';

import { customTheme } from '../gatsby-plugin-chakra-ui/theme';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <React.StrictMode>
      <Box
        minH='calc(100% - 75px - 80px)'
        padding={['10px', '10px', '36px']}
        maxW='1440px'
        marginLeft='auto'
        marginRight='auto'
      >
        <Helmet
          titleTemplate="systemd.guru"
          defaultTitle="create your timer"
        >
          <meta name="description" content="create your timer"/>
        </Helmet>

        <Box as='header'
             textAlign='center'
        >
          <Button onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>

          <Heading size="2xl" fontWeight="regular">
            systemd.guru
          </Heading>
          <Heading size="md" color={customTheme[colorMode].subText}>
            create your timer
          </Heading>
        </Box>


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
            console.log(JSON.stringify(values, null, 2));
          }}
        >
          <Form>
            <main>{children}</main>
          </Form>

        </Formik>
        <footer>{/* TODO */}</footer>
      </Box>
    </React.StrictMode>
  );
}
