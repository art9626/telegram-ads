import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/fetch.ts";
import ShowAdButton from "../components/ShowAdButton.tsx";
import {Box, Flex, Progress, Text} from "@radix-ui/themes";
import {StarIcon} from "@radix-ui/react-icons";

export default function Main() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const xpProgress = Math.ceil((user?.game_data.xp || 0) / (user?.game_data.xp_to_next_level || 1))

  return (
    <>
      <Text size="9" as="div" align="center">{(user?.game_data.balance || 0) / 10e9}</Text>
      <Text size="4" as="div" align="center">Level: {user?.game_data.level}</Text>
      <Flex align={"center"} direction={"column"}>
        <Box width="50%">
          <Text as="div" align="center">To next level</Text>
          <Progress value={xpProgress} max={100} size="3" />
        </Box>
      </Flex>
      <Flex align={"center"} direction={"column"}>
        <ShowAdButton />
        <Box mt="4">
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
        </Box>
      </Flex>
      <Text as="div" align="center">Daily tasks</Text>
      <Flex align={"center"} direction={"column"}>
        <Box width="50%">
          <Text as="div" align="center">Progress to listing</Text>
          <Progress value={25} size="3" />
        </Box>
      </Flex>
    </>
  );
}
