import { Box, Flex, Progress, Spinner, Text } from "@radix-ui/themes";
import { useUser } from "../providers/UserProvider";

export default function User() {
  const { user, status } = useUser();

  if (status === "pending") return <Spinner size="2" />;

  const progress =
    ((user?.game_data.xp || 0) * 100) / (user?.game_data.xp_to_next_level || 1);

  return (
    <Flex direction="column">
      <Text size="9" as="div" align="center">
        {(user?.game_data.balance ?? 0) / 10e9}
      </Text>
      <Text size="4" as="div" align="center">
        Level: {user?.game_data.level}
      </Text>
      <Flex align={"center"} direction={"column"}>
        <Box width="50%">
          <Text as="div" align="center">
            CurrentXP: {user?.game_data.xp}
          </Text>
          <Text as="div" align="center">
            NextXP: {user?.game_data.xp_to_next_level}
          </Text>
          <Progress value={progress} max={100} size="3" />
        </Box>
      </Flex>
    </Flex>
  );
}
