import { LogoutOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../consts/colors";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";

const MENU_ITEM_STYLE = {
  backgroundColor: "black",
};

export default function LeaderboardRowMore({ nft, onOpen }) {
  const { status } = useNftStatus(nft);

  return (
    <Menu>
      <MenuButton as={Button} style={{ backgroundColor: "black" }}>
        <MoreOutlined rotate={90} />
      </MenuButton>
      <MenuList style={{ backgroundColor: "black" }}>
        <MenuItem style={MENU_ITEM_STYLE}>
          <div className={`flex items-center justify-center gap-4`}>
            <MailOutlined />
            <span>Send DYAD</span>
          </div>
        </MenuItem>
        {status === STATUS.LIQUIDATABLE && (
          <MenuItem style={MENU_ITEM_STYLE} onClick={onOpen}>
            <div
              className={`text-[${COLORS.Red}] flex items-center justify-center gap-4`}
            >
              <LogoutOutlined />
              <span>Liquidate</span>
            </div>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
