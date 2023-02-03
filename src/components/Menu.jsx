import { MenuOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { DOCS_URL } from "../consts/consts";

export default function MenuCustom() {
  const MENU_ITEM_STYLE = {
    backgroundColor: "black",
  };

  return (
    <Menu>
      <MenuButton as={Button} style={{ backgroundColor: "black" }}>
        <MenuOutlined style={{ height: "1.5rem" }} />
      </MenuButton>
      <MenuList style={{ backgroundColor: "black" }}>
        <Link href='/'>
          <MenuItem style={MENU_ITEM_STYLE}>
            Home
          </MenuItem>
        </Link>

        <Link href='/leaderboard'>
          <MenuItem
            style={MENU_ITEM_STYLE}
          >
            Leaderboard
          </MenuItem>
        </Link>

        <Link href='/intro'>
          <MenuItem
            style={MENU_ITEM_STYLE}
            onClick={() => window.open(DOCS_URL + "/intro")}
          >
            Docs
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

