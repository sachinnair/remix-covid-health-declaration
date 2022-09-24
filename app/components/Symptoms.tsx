import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Tappable from "~/common/Tappable";
import { SYMPTOMS } from "~/constants";

export default function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({});
  const handleClicks = (selectedSymptom: string, exists: boolean) => {
    selectedSymptoms[selectedSymptom] = exists
    setSelectedSymptoms(selectedSymptoms);
  }
  
  return (
    <Box boxShadow="base" p="6" rounded="md" bg="white">
      <Text as="u" className="font-semibold" fontSize="2xl">
        Symptoms
      </Text>
        <div>
            <Text className="mt-5">Please click/tap on the following symptoms, if you experience them now or experienced them within the last 14 days?<span>(Even if your symptoms are mild)</span></Text>
            {Object.keys(SYMPTOMS).map((symptom, index) => <Tappable clickHandler={handleClicks} key={symptom} symptom={symptom}>{SYMPTOMS[symptom]}</Tappable>)}
        </div>
    </Box>
  );
}
