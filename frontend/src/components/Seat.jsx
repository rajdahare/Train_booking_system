

import { Box, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

// Seat component that displays a seat number and its booking status
export default function Seat({ seatNumber, isBooked }) {
    return (
        <Tooltip label={isBooked ? "Occupied" : "Available"} fontSize="sm" placement="top" hasArrow>
            <Box
                color="white"
                h="30px"
                w="30px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="1"
                bg={isBooked ? "rgb(244, 207, 122)" : "#6CAC48"}
                rounded="10px"
                shadow="lg"
                borderWidth="2px"
                borderColor={isBooked ? "rgb(244, 207, 122)" : "#6CAC48"}
                cursor="pointer"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                    transform: "scale(1.1)",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Text
                    align="center"
                    fontSize="md"
                    // as="b"
                    color="white"
                    textShadow="1px 1px 2px rgba(0,0,0,0.3)"
                >
                    {seatNumber}
                </Text>
            </Box>
        </Tooltip>
    );
}
