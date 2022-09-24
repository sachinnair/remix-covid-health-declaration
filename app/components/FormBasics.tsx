import { useState, useEffect } from "react";
import {
  Input,
  FormLabel,
  NumberInput,
  FormControl,
  InputGroup,
  Button,
  ButtonGroup,
  NumberInputField,
  useBoolean,
  Text,
  Box,
} from "@chakra-ui/react";

export default function FormBasics() {
  const [isDegreeCelsius, setIsDegreeCelsius] = useBoolean(true);

  const [temperature, setTemperature] = useState<string | number>("");
  useEffect(() => {
    if (temperature >= 35 && temperature <= 41 && !isDegreeCelsius) {
      setIsDegreeCelsius.on();
    } else if (temperature >= 95 && temperature <= 105.8 && isDegreeCelsius) {
      setIsDegreeCelsius.off();
    }
  }, [temperature]);

  return (
    <Box boxShadow="base" p="6" rounded="md" bg="white">
      <Text as="u" className="font-semibold" fontSize="2xl">
        Basics
      </Text>
      <div>
        <FormLabel
          className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right mt-5"
          htmlFor="details-full-name"
        >
          Full Name
        </FormLabel>

        <Input
          className=""
          name="full-name"
          id="details-full-name"
          type="text"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <FormControl>
          <FormLabel className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right mt-5">
            Temperature
          </FormLabel>
          <InputGroup>
            <NumberInput
              onChange={(val) => setTemperature(val as unknown as number)}
              value={temperature}
              name="temperature"
              max={isDegreeCelsius ? 41.0 : 105.8}
              min={isDegreeCelsius ? 35 : 95}
            >
              <NumberInputField />
            </NumberInput>
            <ButtonGroup isAttached variant="outline" className="ml-2">
              <Button
                isActive={isDegreeCelsius}
                onClick={setIsDegreeCelsius.on}
              >
                &#176; C
              </Button>
              <Button
                isActive={!isDegreeCelsius}
                onClick={setIsDegreeCelsius.off}
              >
                &#176; F
              </Button>
            </ButtonGroup>
            <input
              type="hidden"
              name="isDegreeCelsius"
              value={isDegreeCelsius as unknown as string}
            />
          </InputGroup>
        </FormControl>
      </div>
    </Box>
  );
}
