import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuCustom() {
  const navigate = useNavigate();

  const MENU_ITEM_STYLE = {
    backgroundColor: "black",
  };

  return (
    <Menu>
      <MenuButton as={Button} style={{ backgroundColor: "black" }}>
        <MenuOutlined />
      </MenuButton>
      <MenuList style={{ backgroundColor: "black" }}>
        <MenuItem style={MENU_ITEM_STYLE} onClick={() => navigate("/")}>
          Home
        </MenuItem>
        <MenuItem style={MENU_ITEM_STYLE}>Dashboard</MenuItem>
        <MenuItem
          style={MENU_ITEM_STYLE}
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </MenuItem>
        <MenuItem
          style={MENU_ITEM_STYLE}
          onClick={() =>
            window.open(
              "https://docs-8fzo3j5z1-dyad.vercel.app/intro",
              "_blank"
            )
          }
        >
          Docs
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
