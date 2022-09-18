import { useState, useEffect } from "react";
import { Form } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createCitizen } from "~/models/citizen.server";

import {
  Input,
  Box,
  Center,
  Image,
  Flex,
  Badge,
  Text,
  FormLabel,
  NumberInput,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  ButtonGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  useBoolean,
  Container,
} from "@chakra-ui/react";

import stylesUrl from "~/styles/declarations.css";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("full-name");
  const temperature = parseFloat(form.get("temperature") as string);
  const isDegreeCelsius = form.get("isDegreeCelsius") === "true";
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string" || (typeof temperature !== "number" && !isNaN(temperature))) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name, temperature, isDegreeCelsius };

  await createCitizen({ data: fields });

  return redirect(`/declarations`);
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Basics() {
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
    <Container>
      <Box>
        <Form method="post">
          <div>
            <FormLabel
              className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
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
              <FormLabel>Temperature</FormLabel>
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
          <div className="mt-5">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Box>
    </Container>
  );
}
