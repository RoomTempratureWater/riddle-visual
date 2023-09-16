import React from "react";
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

export default function Counter() {

  let [a, seta] = useState(0);
  
  return <Flex>
    <ArrowBackIcon onClick={() => seta(a-1)}>Decrement</ArrowBackIcon>
    {a}
    <ArrowForwardIcon onClick={() => seta(a+1)}>Increment</ArrowForwardIcon>
    </Flex>;
}
