import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorMode,
} from '@chakra-ui/core/dist';
import React, { useState } from 'react';

import { Layout } from '../components/Layout';
import OnCalendar from '../components/OnCalendar';
import { customTheme } from '../gatsby-plugin-chakra-ui/theme';
import CodeBox from '../components/CodeBox';
import { Field, useFormikContext } from 'formik';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <IndexPageContent/>
    </Layout>
  );
};


const IndexPageContent = () => {
  const { colorMode } = useColorMode();
  const [showSystemdComponent, setShowSystemdComponent] = useState('OnCalendar');
  const systemdEvents = ['OnCalendar', 'OnActiveSec', 'OnBootSec', 'OnStartupSec', 'OnUnitActiveSec', 'OnUnitInActiveSec'];
  const { values, handleChange } = useFormikContext();

  return (
    <>
      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>name</FormLabel>
        <Input name="unitName" onChange={handleChange} value={values.unitName} />
      </FormControl>

      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>command</FormLabel>
        <Input name="unitCommand" onChange={handleChange} value={values.unitCommand} />
      </FormControl>

      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>user</FormLabel>
        <Input name="unitUser" onChange={handleChange} value={values.unitUser} />
      </FormControl>

      <FormControl>
        <FormLabel color={customTheme[colorMode].subTitle}>description</FormLabel>
        <Input name="unitDesc" onChange={handleChange} value={values.unitDesc} />
      </FormControl>

      <ButtonGroup spacing={4} mt={2}>
        {systemdEvents.map((systemdEvent: string) => (
          <Button
            mt={2}
            key={systemdEvent}
            onClick={(): void => setShowSystemdComponent(systemdEvent)}
          >
            {systemdEvent}
          </Button>
        ))}
      </ButtonGroup>

      {showSystemdComponent === 'OnCalendar' ? (<OnCalendar/>) : (<Box>just sec</Box>)}

      <Box display={{ md: 'flex' }} mt="10px">
        <CodeBox unitType='service'/>
        <CodeBox unitType='timer'/>
      </Box>

      {/* footer */}
      <Box
        display={{ md: 'flex' }}
        color={customTheme[colorMode].strongText}
        mt="10px"
      >
        <Box ml="auto" mr="auto"><Link href="https://www.freedesktop.org/software/systemd/man/systemd.timer.html"
                                       isExternal>man</Link></Box>
        <Box ml="auto" mr="auto"><Link href="https://github.com/Davasny/systemd.guru" isExternal>github</Link></Box>
        <Box ml="auto" mr="auto"><Text>inspired by <Link href="https://crontab.guru"
                                                         isExternal>crontab.guru</Link></Text></Box>
      </Box>
    </>
  );
};
