import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  Flex,
  Link, Text,
} from '@chakra-ui/core/dist';
import React, { useState } from 'react';

import { Layout } from '../components/Layout';
import OnCalendar from '../components/OnCalendar';
import { customTheme } from '../gatsby-plugin-chakra-ui/theme';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const codeString = `[Unit]
Description=aaa

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
`;


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

      <Box display={{ md: 'flex' }}>
        <Box
          width={[
            '100%', // base
            '100%', // 480px upwards
            '50%',
          ]}
          mt="5px"
          ml={['0px', '0px', '4px']}
          mr={['0px', '0px', '4px']}
        >
          <SyntaxHighlighter
            // w="100%"
            language="ini"
            style={(colorMode === 'light') ? docco : a11yDark}
            showLineNumbers
          >
            {codeString}
          </SyntaxHighlighter>
        </Box>
        <Box
          width={[
            '100%', // base
            '100%', // 480px upwards
            '50%',
          ]}
          mt="5px"
          ml={['0px', '0px', '4px']}
          mr={['0px', '0px', '4px']}
        >
          <SyntaxHighlighter language="ini" style={(colorMode === 'light') ? docco : a11yDark} showLineNumbers>
            {codeString}
          </SyntaxHighlighter>
        </Box>
      </Box>
      <Box
        display={{ md: 'flex' }}
        color={customTheme[colorMode].strongText}
        mt="10px"
      >
        <Box ml="auto" mr="auto"><Link href="https://github.com/Davasny/systemd.guru" isExternal>github</Link></Box>
        <Box ml="auto" mr="auto"><Link href="https://www.freedesktop.org/software/systemd/man/systemd.timer.html" isExternal>man</Link></Box>
        <Box ml="auto" mr="auto"><Text>inspired by <Link href="https://crontab.guru" isExternal>crontab.guru</Link></Text></Box>
      </Box>
    </Layout>
  );
}
