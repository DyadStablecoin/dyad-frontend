import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { DOCS_URL } from "../consts/consts";

export default function MenuCustom() {
  const router = useRouter();

  const MENU_ITEM_STYLE = {
    backgroundColor: "black",
  };

  return (
    <Menu>
      <MenuButton as={Button} style={{ backgroundColor: "black" }}>
        <MenuOutlined style={{ height: "1.5rem" }} />
      </MenuButton>
      <MenuList style={{ backgroundColor: "black" }}>
        <MenuItem style={MENU_ITEM_STYLE} onClick={() => router.push("/")}>
          Home
        </MenuItem>
        {/* <MenuItem
          style={MENU_ITEM_STYLE}
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </MenuItem> */}
        <MenuItem
          style={MENU_ITEM_STYLE}
          onClick={() => window.open(DOCS_URL + "/intro")}
        >
          Docs
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
