import { Text } from "@chakra-ui/react";
import {
  Outlet,
  useTransition,
} from "@remix-run/react";
import { useEffect, useState } from "react";
// import type { LoaderFunction } from "@remix-run/server-runtime";
// import { redirect } from "@remix-run/node";

export default function Declarations() {
  // const fet = useFetchers()
  const transition = useTransition();
  const [formSentData, setFormSentData] = useState<{}>({});

  useEffect(() => {
    if(transition.submission?.formData.has('temperature')) {
      const formData = transition?.submission.formData.entries();
      setFormSentData({ ...Object.fromEntries(formData) });
    }
  }, [transition]);

  return (
    <main>
      <div className="m-5 sm:m-20 sm:mb-10">
        <Text as="b" fontSize="4xl">
          COVID-19
        </Text>
        <br />
        <Text as="b" fontSize="4xl">
          HEALTH DECLARATION
        </Text>
      </div>
      <Outlet context={formSentData} />
    </main>
  );
}