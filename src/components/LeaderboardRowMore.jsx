import { useDisclosure } from "@chakra-ui/react";
import { LogoutOutlined, MailOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { COLORS } from "../consts/colors";
import useNftStatus, { STATUS } from "../hooks/useNftStatus";
import Liquidate from "./Liquidate";
import Popup from "./Popup";
import MoveDeposit from "./MoveDeposit";
import Snipe from "./Snipe";

const MENU_ITEM_STYLE = {
  backgroundColor: "black",
};

export default function LeaderboardRowMore({ nft, setTxHash }) {
  const { status } = useNftStatus(nft);

  const {
    isOpen: isOpenLiquidate,
    onOpen: onOpenLiquidate,
    onClose: onCloseLiquidate,
  } = useDisclosure();
  const {
    isOpen: isOpenMoveDeposit,
    onOpen: onOpenMoveDeposit,
    onClose: onCloseMoveDeposit,
  } = useDisclosure();
  const {
    isOpen: isOpenSnipe,
    onOpen: onOpenSnipe,
    onClose: onCloseSnipe,
  } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={Button} style={{ backgroundColor: "black" }}>
          <MoreOutlined rotate={90} />
        </MenuButton>
        <MenuList style={{ backgroundColor: "black" }}>
          <MenuItem style={MENU_ITEM_STYLE} onClick={onOpenMoveDeposit}>
            <div className={`flex items-center justify-center gap-4`}>
              <MailOutlined />
              <span>Send DYAD</span>
            </div>
          </MenuItem>
          {status === STATUS.LIQUIDATABLE && (
            <MenuItem style={MENU_ITEM_STYLE} onClick={onOpenLiquidate}>
              <div
                className={`text-[${COLORS.Red}] flex items-center justify-center gap-4`}
              >
                <LogoutOutlined />
                <span>Liquidate</span>
              </div>
            </MenuItem>
          )}
          <MenuItem style={MENU_ITEM_STYLE} onClick={onOpenSnipe}>
            <div
              className={`text-[${COLORS.Red}] flex items-center justify-center gap-4`}
            >
              <LogoutOutlined />
              <span>Snipe</span>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
      <Popup isOpen={isOpenLiquidate} onClose={onCloseLiquidate}>
        <Liquidate nft={nft} onClose={onCloseLiquidate} setTxHash={setTxHash} />
      </Popup>
      <Popup isOpen={isOpenMoveDeposit} onClose={onCloseMoveDeposit}>
        <MoveDeposit
          nft={nft}
          onClose={onCloseMoveDeposit}
          setTxHash={setTxHash}
        />
      </Popup>
      <Popup isOpen={isOpenSnipe} onClose={onCloseSnipe}>
        <Snipe nft={nft} onClose={onCloseSnipe} setTxHash={setTxHash} />
      </Popup>
    </>
  );
}
