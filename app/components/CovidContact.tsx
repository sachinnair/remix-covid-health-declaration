import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

type CovidContactProp = {
    clickHandler: Function
}

export default function CovidContact({ clickHandler }: CovidContactProp) {
  const [value, setValue] = useState<string>('No')

  function handleChange(newValue: string) {
    clickHandler(newValue)
    setValue(newValue);
  }

  return (
    <Box boxShadow="base" p="6" rounded="md" bg="white">
      <div>
        <Text className="mt-1">
          Have you been in contact with anyone who is suspected to have or/has
          been diagnosed with Covid-19 within the last 14 days?
        </Text>

        <RadioGroup name="hadCovidContact" className="mt-5" size="lg" onChange={handleChange} value={value}>
          <Stack spacing={10} direction="row">
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Stack>
        </RadioGroup>
      </div>
    </Box>
  );
}
