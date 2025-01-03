import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Seat from './Seat';

export default function Compartment({ loading, data }) {
    let booked = 0;
    let notBooked = 0;

    data?.forEach((item) => {
        if (item.isBooked) {
            booked++;
        } else {
            notBooked++;
        }
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            h="90%"
            gap="2"
            // mt="5"
            p="2"
            bg="white"
            rounded="lg"
        // shadow="md"
        >
            {loading ? (
                <Heading size="lg" textAlign="center" color="black.600">
                    Ticket Booking System
                </Heading>
            ) : (
                <Text textAlign="center" fontSize="xl" fontWeight="bold" color="black.600">
                    Please Wait.
                </Text>
            )}

            <Grid
                templateColumns="repeat(7, 1fr)"
                gap="0.5"
                bg="#F9FAFB"
                minH="fit-content"
                h="60vh"
                minW="350px"
                w="fit-content"
                rounded="lg"
                p="2"
            // shadow="sm"
            >
                {data?.map((item) => (
                    <Seat key={item._id} isBooked={item.isBooked} seatNumber={item.seatNumber} />
                ))}
            </Grid>
            <Flex
                gap="4"
                justify="space-around"
                align="center"
                color="white"
                fontSize="lg"
                fontWeight="semibold"
            >
                <Box
                    w="4%"
                    textAlign="center"
                    bg="rgb(244, 207, 122)"
                    rounded="2px"
                    p="2"
                    shadow="lg"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {/* <Text>Booked = {booked}</Text> */}
                </Box>
                <Text color="black" >Booked = {booked}</Text>
                <Box
                    w="4%"
                    textAlign="center"
                    bg="#6CAC48"
                    rounded="2px"
                    p="2"
                    shadow="lg"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    {/* <Text>Available = {notBooked}</Text> */}
                </Box>
                <Text color="black">Available = {notBooked}</Text>
            </Flex>
        </Box>
    );
}
