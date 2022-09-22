import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import type { LoaderFunction } from "@remix-run/node";
import { useOutletContext, useTransition } from "@remix-run/react";
import { useEffect, useState } from "react";

import { SYMPTOMS } from "~/constants";

const TABLE_DATA_MAPPER: {[key: string]: string} = {
  "full-name": 'Full Name',
  "temperature": "Temperature",
  "hadCovidContact": "Past contact with a Covid Patient",
}

// export const loader: LoaderFunction = () => {
//   return redirect("/");
// }

const dummyData = { prop1: "val1", prop2: "val2", prop3: "val3" };

export default function Review() {
  const formDataContext = useOutletContext<{ [key: string]: string }>();
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [rowSpan, setRowSpan] = useState<number>();
  /* const [someContext, setSomeContext] = useState<{}>({});
  useEffect(() => {
    console.log(someContext);
    console.log('log me', transition.submission?.formData);
    if(transition.submission) {
      setSomeContext(transition.submission);
    }
  }); */

  useEffect(() => {
    console.log("Yay!", formDataContext);
    if(tableData.length === 0) {
      const tdValues = [];
      let countOfSymptoms = 0;
      for (const index in formDataContext) {
        let transformer;
        if (index.search(/has/) !== -1) {
          if (countOfSymptoms === 0) {
            transformer = {
              col1: "Symptoms",
              col2: SYMPTOMS[index.replace(/has/, "")],
            };
            countOfSymptoms += 1;
          } else {
            countOfSymptoms += 1;
            transformer = {
              col1: "",
              col2: SYMPTOMS[index.replace(/has/, "")],
            };
          }
        } else if(index !== 'isDegreeCelsius') {
          let col2Value = formDataContext[index];
          if(index === 'temperature') {
            col2Value += ` \xB0${formDataContext['isDegreeCelsius'] ? 'C' : 'F'}`
          }
          transformer = {
            col1: TABLE_DATA_MAPPER[index],
            col2: col2Value
          };
        }
  
        transformer && tdValues.push(transformer);
      }
      setRowSpan(countOfSymptoms);
      setTableData(tdValues);
    }
  }, [formDataContext]);

  return (
    <Box boxShadow="base" p="6" rounded="md">
      <Text
        className="p-2 font-semibold"
        bg="lightblue"
        fontSize="2xl"
        align="center"
      >
        Thank you! Data was submitted successfully!
      </Text>
      <TableContainer maxWidth="md" className="ml-auto mr-auto mt-5">
        <Table className="border-collapse border border-slate-300">
          <Tbody>
            {tableData.map((rowData, index) => (
              <Tr className="border text-center font-extralight" key={index} >
                {rowData.col1 && <Td rowspan={rowData.col1 === 'Symptoms' ? rowSpan : 1}>{rowData.col1}</Td>}
                <Td w="60%" className="border">
                  {rowData.col2}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
