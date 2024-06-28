import { NavLink } from "react-router-dom";
import {Box, Flex, Separator} from "@radix-ui/themes";

export default function Footer() {
  return (
    <footer>
      <Flex direction="row" gap="3">
          <Box>
            <NavLink to={"/"}>Main</NavLink>
          </Box>
          <Separator orientation="vertical" />
          <Box>
            <NavLink to={"/friends"}>Friends</NavLink>
          </Box>
          <Separator orientation="vertical" />
          <Box>
            <NavLink to={"/upgrades"}>Upgrades</NavLink>
          </Box>
          <Separator orientation="vertical" />
          <Box>
            <NavLink to={"/game-info"}>Info</NavLink>
          </Box>
          <Separator orientation="vertical" />
          <Box>
            <NavLink to={"/tasks"}>Tasks</NavLink>
          </Box>
      </Flex>
    </footer>
  );
}
