import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      spacing={4}
      boxShadow="md"
      width="300px"
    >
      <Image src={imageSrc} alt={title} width="100%" height="auto" />
      <Heading fontSize="xl">{title}</Heading>
      <Text>{description}</Text>
      <HStack spacing={2}>
        <Text>Read more</Text>
        <FontAwesomeIcon icon={faArrowRight} />
      </HStack>
    </VStack>
  );
};

export default Card;
