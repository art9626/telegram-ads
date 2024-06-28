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


  return (
    <>
     <Text size="9" as="div" align="center">{(user?.game_data.balance || 0) / 10e9}</Text>
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
