import { Form, Link, useOutletContext } from "@remix-run/react";

// import { Outlet } from "@remix-run/react";
// import type { LoaderFunction } from "@remix-run/server-runtime";
import type { LinksFunction } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { TCitizen } from "~/models/citizen.server";
import { createCitizen } from "~/models/citizen.server";

import stylesUrl from "~/styles/declarations.css";

import { Box, Button, Container } from "@chakra-ui/react";

import FormBasics from "~/components/FormBasics";
import Symptoms from "~/components/Symptoms";
import CovidContact from "~/components/CovidContact";
import { SYMPTOMS as LISTOFSYMPTOMS } from "~/constants";

// export const loader: LoaderFunction = () => {
//   return redirect("/");
// }

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

  for (let SYMPTOM of Object.keys(LISTOFSYMPTOMS)) {
    if (form.get('has' + SYMPTOM) !== null) {
      fields['has' + SYMPTOM] = true;
    }
  }

  debugger;

  const { id: recordId } = await createCitizen({ data: fields });
  return redirect(`/review?recordId=${recordId}`);
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Details() {
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
            <Button colorScheme={"telegram"} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Box>
    </Container>
  );
}
