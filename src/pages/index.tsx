import { Box, Button, ButtonGroup, FormControl, FormLabel, Input, useColorMode } from '@chakra-ui/core/dist';
import React, { useState } from 'react';

import { Layout } from '../components/Layout';
import OnCalendar from '../components/OnCalendar';
import { customTheme } from '../gatsby-plugin-chakra-ui/theme';


export default function IndexPage(): JSX.Element {
  const { colorMode } = useColorMode();
  const [showSystemdComponent, setShowSystemdComponent] = useState('OnCalendar');
  const systemdEvents = ['OnCalendar', 'OnActiveSec', 'OnBootSec', 'OnStartupSec', 'OnUnitActiveSec', 'OnUnitInActiveSec'];

  return (
    <Layout>
      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>name</FormLabel>
        <Input type='text'/>
      </FormControl>

      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>command</FormLabel>
        <Input type='text'/>
      </FormControl>

      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>description</FormLabel>
        <Input type='text'/>
      </FormControl>

      <ButtonGroup spacing={4} mt={2}>
        {systemdEvents.map((systemdEvent: string) => (
          <Button mt={2} key={systemdEvent}
                  onClick={(): void => setShowSystemdComponent(systemdEvent)}>{systemdEvent}</Button>
        ))}
      </ButtonGroup>

      {showSystemdComponent === 'OnCalendar' ? (<OnCalendar/>) : (<Box>just sec</Box>)}

    </Layout>
  );
}
