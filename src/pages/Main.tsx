import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/fetch.ts";
import ShowAdButton from "../components/ShowAdButton.tsx";
import {Box, Flex, Progress, Section, Text} from "@radix-ui/themes";
import {StarIcon} from "@radix-ui/react-icons";

export default function Main() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });


  return (
    <>
      <Section>
       <Text size="9" as="div" align="center">{user?.game_data.balance}</Text>
      </Section>
      <Section>
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

      </Section>
      <Section>
        <Text as="div" align="center">Daily tasks</Text>
      </Section>
      <Section>
        <Flex align={"center"} direction={"column"}>
          <Box width="50%">
            <Text as="div" align="center">Progress to listing</Text>
            <Progress value={25} size="3" />
          </Box>
        </Flex>

      </Section>
    </>
  );
}
