import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

export default function MenuCustom() {
  return (
    <Menu>
      <MenuButton as={Button}>
        <MenuOutlined />
      </MenuButton>
      <MenuList>
        <MenuItem>Home</MenuItem>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Leaderboard</MenuItem>
        <MenuItem>Docs</MenuItem>
      </MenuList>
    </Menu>
  );
}
