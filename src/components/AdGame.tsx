import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { StarIcon } from "@radix-ui/react-icons";
import User from "./UserInfo";
import ShowAdButton from "./ShowAdButton";

export default function AdGame() {
  return (
    <>
      <User />
      <Flex align={"center"} direction={"column"}>
        <ShowAdButton />
      </Flex>
      <Text as="div" align="center">
        Daily reward
        <Box>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Box>
        <Button disabled={true}>Claim reward</Button>
      </Text>
    </>
  );
}
