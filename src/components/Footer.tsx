import { NavLink } from "react-router-dom";
import { Box, Separator, Text } from "@radix-ui/themes";
import {
  DoubleArrowUpIcon,
  IdCardIcon,
  PersonIcon,
  TargetIcon,
  TimerIcon,
} from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer>
        <Box>
          <NavLink to={"/friends"}>
            <PersonIcon />
            <Text as="div">Friends</Text>
          </NavLink>
        </Box>
        <Separator orientation="vertical" />
        <Box>
          <NavLink to={"/perks"}>
            <DoubleArrowUpIcon />
            <Text as="div">Perks</Text>
          </NavLink>
        </Box>
        <Separator orientation="vertical" />
        <Box>
          <NavLink to={"/"}>
            <TargetIcon />
            <Text as="div" size="6">
              Earn
            </Text>
          </NavLink>
        </Box>
        <Separator orientation="vertical" />
        <Box>
          <NavLink to={"/achievements"}>
            <IdCardIcon />
            <Text as="div">Prizes</Text>
          </NavLink>
        </Box>
        <Separator orientation="vertical" />
        <Box>
          <NavLink to={"/tasks"}>
            <TimerIcon />
            <Text as="div">Tasks</Text>
          </NavLink>
        </Box>
    </footer>
  );
}
