import { Outlet } from "@remix-run/react";
import { Text } from "@chakra-ui/react";

export default function Declarations() {
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
      <Outlet />
    </main>
  );
}
