

import { Button, Flex, Input, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import Seat from './Seat';
import axios from 'axios';

export default function InputBox({ fetchData }) {
    const [numberOfSeat, setNumberOfSeat] = useState();
    const [axiosResponse, setAxiosResponse] = useState();
    const [bookingProcessing, setBookingProcessing] = useState(false);
    const [resetBookingProcessing, setResetBookingProcessing] = useState(false);
    const toast = useToast();

    function displayToast(status, message) {
        toast({
            title: message,
            status: status,
            duration: 3000,
            isClosable: true,
        });
    }

    function handelBookTicket() {
        if (numberOfSeat > 7) {
            displayToast("error", "Only allow to book 7 seats at a time");
        } else if (!numberOfSeat || numberOfSeat <= 0) {
            displayToast("error", "Enter a valid booking number");
        } else {
            handelAxiosPost();
        }
    }

    const handelAxiosPost = async () => {
        setBookingProcessing(true);
        try {
            const response = await axios.post("https://seat-booking-tg8y.onrender.com/api/seats/book", { numOfSeats: numberOfSeat });
            setAxiosResponse(response.data.data);
            fetchData();
            displayToast("success", "Seat successfully booked");
        } catch (error) {
            console.error('Error fetching data:', error);
            displayToast("error", error.response.data.message);
        }
        setBookingProcessing(false);
    };

    const handelResetBooking = async () => {
        setResetBookingProcessing(true);
        try {
            const response = await axios.post("https://seat-booking-tg8y.onrender.com/api/seats");
            console.log(response.data);
            fetchData();
            setAxiosResponse();
            displayToast("success", "Booking successfully reset.");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setResetBookingProcessing(false);
    };

    return (
        <VStack align="start" bg="white" p="6" rounded="lg" shadow="md" spacing="4" w="500px">
            <Flex gap="2" align="center">
                <Text fontWeight="bold" fontSize="lg" mr="10">
                    Book Seats   -
                </Text>
                {axiosResponse?.map((item) => (
                    <Seat key={item._id} isBooked={true} seatNumber={item.seatNumber} />
                ))}
            </Flex>

            <Flex gap="2" w="full">
                <Input
                    disabled={bookingProcessing || resetBookingProcessing}
                    bg="gray.50"
                    placeholder="Enter number of seats."
                    border="1px solid"
                    onChange={(e) => setNumberOfSeat(parseInt(e.target.value))}
                    type="number"
                />
                <Button
                    isDisabled={bookingProcessing || resetBookingProcessing}
                    px="6"
                    colorScheme="green"
                    bg="#6CAC48"
                    onClick={handelBookTicket}
                    isLoading={bookingProcessing}
                >
                    Book
                </Button>
            </Flex>

            <Button
                isDisabled={bookingProcessing || resetBookingProcessing}
                colorScheme="red"
                bg="red.500"
                w="full"
                onClick={handelResetBooking}
                isLoading={resetBookingProcessing}
            >
                Reset Booking
            </Button>
        </VStack>
    );
}
