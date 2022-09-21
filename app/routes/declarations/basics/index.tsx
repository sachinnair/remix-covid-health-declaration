import { Form, Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { TCitizen } from "~/models/citizen.server";
import { createCitizen } from "~/models/citizen.server";

import { Box, Button, Container } from "@chakra-ui/react";

import stylesUrl from "~/styles/declarations.css";
import FormBasics from "~/components/FormBasics";
import Symptoms from "~/components/Symptoms";
import CovidContact from "~/components/CovidContact";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("full-name");
  const temperature = parseFloat(form.get("temperature") as string);
  const isDegreeCelsius = form.get("isDegreeCelsius") === "true";
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof name !== "string" ||
    (typeof temperature !== "number" && !isNaN(temperature))
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields: TCitizen = { name, temperature };
  if (!isDegreeCelsius) {
    fields["isDegreeCelsius"] = isDegreeCelsius;
  }

  await createCitizen({ data: fields });

  return redirect(`/declarations/basics`);
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Basics() {
  return (
    <Container>
      <Box>
        <Form method="post">
          <FormBasics />
          <br />
          <Symptoms />
          <br />
          <CovidContact clickHandler={() => {}} />
          <div className="mt-5 flex w-full justify-end">
            <Link
              to="/review"
              className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            >
              Next
            </Link>
          </div>
          <div className="mt-5 flex w-full justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Box>
    </Container>
  );
}
