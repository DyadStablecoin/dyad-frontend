import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCustom() {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton as={Button}>
        <MenuOutlined />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
        <MenuItem>Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/leaderboard")}>
          Leaderboard
        </MenuItem>
        <MenuItem>Docs</MenuItem>
      </MenuList>
    </Menu>
  );
}
