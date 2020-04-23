import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useColorMode } from '@chakra-ui/core';
import { useFormikContext } from 'formik';
import { railscasts, docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box, Text } from '@chakra-ui/core/dist';


const CodeBox: React.FC = (props) => {
  const { colorMode } = useColorMode();
  const { values } = useFormikContext();
  const codeStrings = {
    service: {
      path: `/usr/local/lib/systemd/user/${values.unitName}.service`,
      template:  `[Unit]
Description=${values.unitDesc}

[Service]
Type=oneshot
User=${values.unitUser}
ExecStart="${values.unitCommand}"

[Install]
WantedBy=timers.target`
    },
    timer: {
      path: `/usr/local/lib/systemd/user/${values.unitName}.timer`,
      template:  `[Unit]
Description=Timer for ${values.unitName} - ${values.unitDesc}

[Timer]
OnCalendar=${values.year_text}-${values.month_text}-${values.day_text} ${values.hour_text}:${values.minute_text}:${values.second_text}
Persistent=true

[Install]
WantedBy=timers.target`
    },
  };

  return (
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
      <Text fontSize="md">{codeStrings[props.unitType].path}</Text>
      <SyntaxHighlighter
        language="ini"
        style={(colorMode === 'light') ? docco : railscasts}
        showLineNumbers
      >
        {codeStrings[props.unitType].template}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBox;
