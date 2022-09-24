import { Checkbox, Box, Text } from "@chakra-ui/react"
import { useState } from "react";

type TappableProps = {
    clickHandler: Function,
    symptom: string,
    children: React.ReactNode
}

export default function Tappable({ symptom, clickHandler, children }: TappableProps): JSX.Element {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        clickHandler(symptom, !isSelected);
        setIsSelected(oldVal => !oldVal)
    }

    return (
        <Box boxShadow="xs" className="flex items-center space-x-4 h-12 w-full mt-5" onClick={handleClick}>
            <Checkbox name={`has${symptom}`} className="ml-4" isChecked={isSelected} />
            <Text>{children}</Text>
        </Box>
    )
}