import { Avatar, Box, Flex, Progress, Spinner, Text } from "@radix-ui/themes";
import { useUser } from "../providers/UserProvider";
import coin from "../assets/coin.png";

export default function User() {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Spinner size="2" />;

  const progress =
    ((user?.game_data.xp || 0) * 100) / (user?.game_data.xp_to_next_level || 1);

  return (
    <Flex direction="column" gap="10px" justify={"between"}>
      <Flex direction={"row"} align={"center"} justify={"center"} gap={"10px"}>
        <Text size="9" as="div" align="center">
          {(user?.game_data.balance ?? 0) / 10e9}
        </Text>
        <Avatar
          src={coin}
          fallback={"$"}
          style={{ width: "50px", height: "50px" }}
        ></Avatar>
      </Flex>

      <Text size="4" as="div" align="center">
        Level: {user?.game_data.level}
      </Text>

      <Flex align={"center"} direction={"column"}>
        <Box width="50%">
          <Progress value={progress} max={100} size="3" />
        </Box>
      </Flex>
    </Flex>
  );
}
