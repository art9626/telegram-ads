import ShowAdButton from "../components/ShowAdButton.tsx";
import { Box, Flex, Text } from "@radix-ui/themes";
import { StarIcon } from "@radix-ui/react-icons";
import User from "../components/User.tsx";

export default function Main() {
  return (
    <>
      <User />
      <Flex align={"center"} direction={"column"}>
        <ShowAdButton />
      </Flex>
      <Flex minHeight={"100px"}>
        <Text as={"div"} id={"ai_field"}></Text>
      </Flex>
      <Text as="div" align="center">
        Daily tasks
        <Box mt="4">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
      </Text>
    </>
  );
}
