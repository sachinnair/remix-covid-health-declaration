import { Form } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { Input, Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";

import stylesUrl from "~/styles/declarations.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default () => {
  return (
    <Box maxW='lg'>
      <Form method="post" action="basicDetails">
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="details-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <Input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              name="full-name"
              id="details-full-name"
              type="text"
              placeholder="Jane Doe"
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="details-temperature"
            >
              Temperature
            </label>
          </div>
          <div className="md:w-2/3">
            <Input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              name="temperature"
              id="details-temperature"
              type="number"
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="button focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </Box>
  );
};
